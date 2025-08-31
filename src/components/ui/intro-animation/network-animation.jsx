import React, { useEffect, useRef, useCallback } from 'react';
import * as d3 from 'd3';
import { NETWORK_CONFIG } from './network-config';
import * as styles from './intro-animation.module.scss';

export function NetworkAnimation() {
  const svgRef = useRef();
  const containerRef = useRef();
  const animationRef = useRef();
  const simulationRef = useRef();

  // Use configuration from config file
  const config = NETWORK_CONFIG;

  // Generate mock contact data
  const generateContactData = useCallback(() => {
    const contacts = [];
    for (let i = 0; i < config.simulation.numContacts; i++) {
      const id1 = Math.floor(Math.random() * config.simulation.numPeople);
      let id2 = Math.floor(Math.random() * config.simulation.numPeople);
      while (id2 === id1) {
        id2 = Math.floor(Math.random() * config.simulation.numPeople);
      }
      const tstart = Math.floor(Math.random() * (config.simulation.maxDuration - 30));
      const duration = Math.floor(Math.random() * 60) + 10;
      const tend = Math.min(tstart + duration, config.simulation.maxDuration);
      
      contacts.push({
        id1: `p${id1}`,
        id2: `p${id2}`,
        tstart,
        tend,
      });
    }
    return contacts;
  }, [config.simulation.numContacts, config.simulation.numPeople, config.simulation.maxDuration]);

  // Process data for D3
  const processData = useCallback((contactData) => {
    const nodeSet = new Set();
    contactData.forEach(d => {
      nodeSet.add(d.id1);
      nodeSet.add(d.id2);
    });
    
    const nodes = Array.from(nodeSet).map(id => ({ id }));
    const allLinks = contactData.map(d => ({
      source: d.id1,
      target: d.id2,
      tstart: d.tstart,
      tend: d.tend,
    }));
    
    return { nodes, allLinks };
  }, []);

  // Initialize the visualization
  const initializeVisualization = useCallback(() => {
    if (!containerRef.current || !svgRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Clear any existing content
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height]);

    const g = svg.append('g');

    // Add zoom behavior
    const zoom = d3.zoom()
      .scaleExtent([config.interaction.zoomMin, config.interaction.zoomMax])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });
    
    if (config.interaction.enableZoom) {
      svg.call(zoom);
      
      // Set initial zoom to be zoomed out 3 times (scale = 1/3)
      const initialScale = 1 / 3;
      const initialTransform = d3.zoomIdentity
        .translate(width / 2, height / 2)
        .scale(initialScale)
        .translate(-width / 2, -height / 2);
      
      svg.call(zoom.transform, initialTransform);
    }

    // Create groups for links and nodes
    const linkGroup = g.append('g')
      .attr('class', 'links')
      .attr('stroke', config.visual.linkColor)
      .attr('stroke-opacity', config.visual.linkOpacity);

    const nodeGroup = g.append('g')
      .attr('class', 'nodes')
      .attr('stroke', config.visual.nodeStroke)
      .attr('stroke-width', config.visual.nodeStrokeWidth);

    // Create force simulation
    const simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id(d => d.id).distance(config.visual.linkDistance).strength(config.forces.linkStrength))
      .force('charge', d3.forceManyBody().strength(config.visual.chargeStrength))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .on('tick', () => {
        linkGroup.selectAll('line')
          .attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y);

        nodeGroup.selectAll('.node')
          .attr('transform', d => `translate(${d.x},${d.y})`);
      });

    simulationRef.current = {
      simulation,
      linkGroup,
      nodeGroup,
      width,
      height,
    };

    return { width, height };
  }, [config.interaction.zoomMin, config.interaction.zoomMax, config.interaction.enableZoom, config.visual.linkColor, config.visual.linkOpacity, config.visual.nodeStroke, config.visual.nodeStrokeWidth, config.visual.linkDistance, config.forces.linkStrength, config.visual.chargeStrength]);

  // Drag functionality
  const createDragBehavior = useCallback((simulation) => {
    if (!config.interaction.enableDrag) {
      return () => {}; // Return empty function if drag is disabled
    }

    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(config.forces.alphaTarget).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended);
  }, [config.interaction.enableDrag, config.forces.alphaTarget]);

  // Setup and reset simulation with new data
  const setupSimulation = useCallback((contactData) => {
    if (!simulationRef.current) return;

    const { simulation, linkGroup, nodeGroup } = simulationRef.current;
    const { nodes, allLinks } = processData(contactData);

    // Update simulation with new nodes
    simulation.nodes(nodes);

    // Create/update node elements
    const nodeElements = nodeGroup.selectAll('.node')
      .data(nodes, d => d.id)
      .join(
        enter => {
          const nodeG = enter.append('g')
            .attr('class', 'node')
            .call(createDragBehavior(simulation));
          
          nodeG.append('circle')
            .attr('r', config.visual.nodeRadius)
            .attr('fill', (d, i) => config.nodeColors[i % config.nodeColors.length]);
          
          return nodeG;
        },
        update => update,
        exit => exit.remove()
      );

    // Remove all existing links
    linkGroup.selectAll('line').remove();

    // Restart simulation
    simulation.alpha(1).restart();

    return { nodes, allLinks };
  }, [processData, createDragBehavior, config.visual.nodeRadius, config.nodeColors]);

  // Update visualization for current time
  const updateVisualization = useCallback((currentTime, allLinks) => {
    if (!simulationRef.current || !allLinks) return;

    const { simulation, linkGroup } = simulationRef.current;
    const activeLinks = allLinks.filter(d => currentTime >= d.tstart && currentTime < d.tend);

    // Update links
    const linkElements = linkGroup.selectAll('line')
      .data(activeLinks, d => `${d.source.id || d.source}-${d.target.id || d.target}`);

    linkElements.exit()
      .transition()
      .duration(config.transitions.linkFadeOut)
      .attr('stroke-opacity', 0)
      .remove();

    linkElements.enter()
      .append('line')
      .attr('stroke-width', 2)
      .attr('stroke', config.visual.linkColor)
      .attr('stroke-opacity', 0)
      .transition()
      .duration(config.transitions.linkFadeIn)
      .attr('stroke-opacity', config.visual.linkOpacity);

    // Update force simulation
    simulation.force('link').links(activeLinks);
    if (simulation.alpha() < 0.1) {
      simulation.alpha(config.forces.alphaRestart).restart();
    }
  }, [config.visual.linkColor, config.visual.linkOpacity, config.transitions.linkFadeIn, config.transitions.linkFadeOut, config.forces.alphaRestart]);

  // Start animation loop
  const startAnimation = useCallback(() => {
    if (animationRef.current) {
      clearInterval(animationRef.current);
    }

    let currentTime = 0;
    let currentData = generateContactData();
    let processedData = setupSimulation(currentData);

    animationRef.current = setInterval(() => {
      if (currentTime < config.simulation.maxDuration) {
        currentTime++;
      } else {
        currentTime = 0;
        currentData = generateContactData();
        processedData = setupSimulation(currentData);
      }
      
      if (processedData?.allLinks) {
        updateVisualization(currentTime, processedData.allLinks);
      }
    }, config.simulation.animationSpeed);
  }, [generateContactData, setupSimulation, updateVisualization, config.simulation.maxDuration, config.simulation.animationSpeed]);

  // Handle window resize
  const handleResize = useCallback(() => {
    if (!containerRef.current || !simulationRef.current) return;

    const container = containerRef.current;
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;

    d3.select(svgRef.current)
      .attr('width', newWidth)
      .attr('height', newHeight)
      .attr('viewBox', [0, 0, newWidth, newHeight]);

    simulationRef.current.simulation
      .force('center', d3.forceCenter(newWidth / 2, newHeight / 2))
      .alpha(0.1)
      .restart();
  }, []);

  // Initialize everything
  useEffect(() => {
    const dimensions = initializeVisualization();
    if (dimensions) {
      startAnimation();
    }

    // Add resize listener
    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      if (simulationRef.current?.simulation) {
        simulationRef.current.simulation.stop();
      }
    };
  }, [initializeVisualization, startAnimation, handleResize]);

  return (
    <div ref={containerRef} className={styles.canvasWrap}>
      <svg ref={svgRef} className={styles.canvasIn} />
    </div>
  );
}

export default NetworkAnimation;
