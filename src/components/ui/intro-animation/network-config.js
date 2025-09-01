/**
 * Configuration for the D3.js Network Animation
 * These settings control the appearance and behavior of the contact network visualization
 */

export const NETWORK_CONFIG = {
  // Simulation parameters
  simulation: {
    numPeople: 40,              // Number of people/nodes in the network
    maxDuration: 300,           // Total simulation duration in seconds
    numContacts: 150,           // Number of contact interactions
    animationSpeed: 100,        // Animation speed in milliseconds per step
  },

  // Visual appearance
  visual: {
    nodeRadius: 8,              // Size of each person/node
    linkDistance: 50,           // Preferred distance between connected nodes
    chargeStrength: -180,       // Force pushing nodes apart (negative = repulsion)
    linkColor: '#000000',       // Color of active connections (black)
    linkOpacity: 0.7,           // Opacity of connections
    nodeStroke: '#fff',         // Border color of nodes
    nodeStrokeWidth: 1.5,       // Border width of nodes
  },

  // Colors for different people (nodes)
  nodeColors: [
    '#ff6b6b', // Red
    '#4ecdc4', // Teal
    '#45b7d1', // Blue
    '#96ceb4', // Green
    '#feca57', // Yellow
    '#ff9ff3', // Pink
    '#54a0ff', // Light Blue
    '#5f27cd', // Purple
    '#00d2d3', // Cyan
    '#ff9f43', // Orange
    '#10ac84', // Dark Green
    '#ee5a52', // Dark Red
    '#0abde3', // Light Cyan
    '#3742fa', // Dark Blue
    '#2f3542', // Dark Gray
  ],

  // Animation transitions
  transitions: {
    linkFadeIn: 200,           // Duration for links appearing
    linkFadeOut: 200,          // Duration for links disappearing
    nodePosition: 300,         // Duration for node position changes
  },

  // Force simulation settings
  forces: {
    linkStrength: 0.5,         // Strength of link forces
    centerStrength: 1,         // Strength of centering force
    alphaTarget: 0.3,          // Target alpha for simulation during drag
    alphaRestart: 0.3,         // Alpha value when restarting simulation
  },

  // Zoom and interaction
  interaction: {
    zoomMin: 0.1,              // Minimum zoom level
    zoomMax: 4,                // Maximum zoom level
    zoomInit: 1,               // Initial zoom level
    enableDrag: true,          // Allow dragging nodes
    enableZoom: true,          // Allow zooming/panning
  }
};

export default NETWORK_CONFIG;
