---
title: Digital epidemiology and simulated outbreaks
description: Here at CoLabo we study the epidemiology of infectious diseases by applying novel mathematical modeling and computer simulation approaches. We are interested in aggregating heterogeneous data sources, including contact tracing data, clinical symptoms, and population-level variables such as case counts, in order to make riks predictions. We are also developing participatory simulation tools that allow spreading a virual pathogen using smartphones' proximity sensing capabilites and generating synthetic epidemiological datasets to be be used for model validation. These tools have applications in STEM education as well, by supporting experiential outbreak exercises in various educational settings.
order: 0
icon: "./icon.png"
---

Here at CoLabo we study the epidemiology of infectious diseases by applying novel mathematical modeling and computer simulation approaches. We are interested in aggregating heterogeneous data sources, including contact tracing data, clinical symptoms, and population-level variables such as case counts, in order to make riks predictions. We are also developing participatory simulation tools that allow spreading a virual pathogen using smartphones' proximity sensing capabilites and generating synthetic epidemiological datasets to be be used for model validation. These tools have applications in STEM education as well, by supporting experiential outbreak exercises in various educational settings.

<!--more-->

Digital epidemiology, in its broadest definition, is epidemiology that simply uses digital data. More narrowly, it has been defined as "epidemiology that uses digital data collected for non-epidemiological purposes" ([Park et al., 2018](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6230537/); [Salathé, 2018](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5754279/)). Our current work fits both definitions, but we also envision digital tools such as outbreak simulation games serving a publich health purpose by educating participants through gamification and tracking disease spread by anonyous contact tracing and symptom reporting.

## Smartphone-based participatory outbreak simulations

[Operation Outbreak](https://operationoutbreak.org/) is an app-based participatory simulation platform that spreads a virtual “pathogen” via Bluetooth through users' smartphones. The plaform includes other components in addition to the smarphone app, including a web admin tool to configure the simulations and an interactive online dashboard to visualize the simulated data.

The platform started as an experiential learning exercise at a middle school in Florida, which culminated a two-week civics curriculum on public health and outbreak response. The exercise originally used stickers to simulate pathogen transmission, and it later on incorporated a Bluetooth-enabled mobile app that increased realism and flexibility.

![Operation Outbreak at Sarasita Military Academy, simulations run between 2016-2018](./oo-sma-cover.jpeg)

### The Operation Outbreak platform

The Operation Outbreak mobile app is driven by a configurable epidemiological model that allows setting different parameters for the simulation: including infectivity, recovery time, and prevalence of various symptoms. This makes it possible to simulate a wide range of pathogens and epidemiological structures (SEIR, SIR, etc.). Interventions such as mask and personal protective equipment, rapid tests and vaccination can also be incorporated into the simulations. The app's UI has been designed to make it easy to use and engaging for users in the middle and high-school age range

![Simulaed health states and interventions in the Operation Outbreak app](./oo-app-diagram.jpeg)

Beyond the iOS and Andoid app itself, the Operation Outbreak platform also comprises a cloud backend database and API that store and manage the parameters and simulation data, a web admin tool that allows teachers and other event organizers to create their own custom simulations, and an interactive online dashboard to visualize and understand the simulated outbreaks. All these components are shown in the following diagram:

![](./oo-platform.jpeg)

We currently have a fully working prototype of the entire platform as depicted in that diagram, from the app:

`video: https://www.youtube.com/watch?v=-S9ny7pIn8A`

to the web admin tool for simulation organizers that can be used tto create not only simulations but also new "pathogens":

`video: https://www.youtube.com/watch?v=bwDEgmqBaqI`

and the interactive dashboard where users can visualize the results of the simulations:

`video: https://www.youtube.com/watch?v=P0Uflrxfifo`

### Applications of Operation Outbreak

From yearly pilots we conducted at Sarasota Military Academy (SMA) Preparatory School between 2015 and 2019, and simulations at many other schools and settings (including Florida Undergraduate Research Conference, One Summer Chicago Social Distancing Ambassador program, Colorado Mesa University, Brigham Young University) between 2019 and 2021, our belief is that Operation Outbreak could increasing engagement and participation in STEM learning using broadly available mobile technologies. Beyond that application in STEM education, we also believe that Operation Outbreak could be a useful model for teaching scientific concepts, showing students that science is exciting, collaborative, and––most importantly––relevant to their lives. OO has applications [beyond education](https://www.wired.com/story/opinion-disease-simulation/) such as in outbreak preparedness and modeling:

- Preparedness and response. Community readiness is vital for successful outbreak control (CDC, 2017; Holmes et al., 2018). OO enables professional, broader training for outbreak response in a safe, simulated environment, conveying the range of human interactions that can emerge in such complex, life-threatening situations.
- In-person educational continuity: The COVID-19 pandemic––which forced schools to shut down in-person instruction since March 2020––is a significant challenge to educational institutions worldwide. However, unprecedented times yield unprecedented opportunity. We have the unique chance to capitalize on the interest and momentum engendered by the current pandemic by deeply engaging students as key stakeholders in ways that can help bring them back to classrooms by using OO to do so. OO captures person-to-person proximity data, and can be used during the pandemic to conduct a real-time physical distancing assessment, providing individual and school-aggregated scorecards to participants.
- Epidemiological modeling. OO can serve as a system for data generation and modeling of outbreaks, which, in turn, can be used to develop new tools for real-world settings and applications. It constitutes a unique source of real-time for developing new outbreak visualization and modeling tools. More generally, the platform and data analytics can help to understand socio-behavioral responses to a dangerous pathogen.

In [this commentary piece](<https://www.cell.com/cell/fulltext/S0092-8674(20)31084-9>) published last year in the journal Cell, we shown how the data from these simulations represent the actual ground truth for pathogen spread in real life ([Moshiri et al., 2019](https://academic.oup.com/bioinformatics/article/35/11/1852/5161084)), Operation Outbreak data can also enable the validation of epidemiological models and methods for COVID-19 and future real-life outbreaks ([Edwards & Lessler, 2020](https://academic.oup.com/aje/article/190/1/17/5874603)):

![Epidemiological analysis of Operation Outbreak data](./epi-analysis.jpeg)

### Next steps with Operation Outbreak

Even though we have made signficant progress with the platform, there are many things to work on, among them:

- Improve the OO app with new functionality such as virtual activities, ‘social distancing’ scorecards, and new avatar designs in order to increase engagement
- Implement easy-to-use pathogen creator in the admin tool, so users who are not experts in epidemiology can construct their now custom outbreaks
- Design and implement education dashboard that participants of a simulation can access to view the data and carry out exercises on data analysis and epidemiology
- Construct new epidemiological models that can be used to parametrize OO simulations and potentially be applied to describe real-life outbreaks

We also envision incorporating a "virtual genome" into the app, so the pathogen can change and "evolve" as it spreads among the simulation's participants. The synthetic sequencing data could then be used to test [phylogenetic tree reconstruction methods](https://beast.community/).

![Images from a few data-inspired projects](./oo-virtual-evo.jpeg)

### Other outbreak exercises

We must point out that the idea of simulating outbreaks has been carried out in many instances before Operation Outbreak, ranging from board/mobile app games such as [Pandemic](<https://en.wikipedia.org/wiki/Pandemic_(board_game)>) and [Plague Inc.](https://en.wikipedia.org/wiki/Plague_Inc.), training programs for epidemiologists and health responders ([Bellan et al., 2012](https://journals.plos.org/plosbiology/article?id=10.1371/journal.pbio.1001295); [Cremin et al., 2018](https://www.sciencedirect.com/science/article/pii/S1755436517300920)), and government-level exercises to test outbreak response capacity, such as the [Crimson Contagion](https://en.wikipedia.org/wiki/Crimson_Contagion) simulation of an influenza pandemic, run by the U.S. Department of Health and Human Services in 2019. One of the key differences between all these past projects and Operation Outbreak is that we are tyring to create an infectious education/simulaton platform that can be accessed by any school in the US, and eventually around the world, that not only provides a technology-mediated experiential learning activity, but also additional tools for educators to customize this activity to the needs and requirements of their classes and then visualize the results and download the data for further exercises in epidemiological analysis.

A famous example of an (unintended) simulated outbreak in a virtual environment is the so-called [Corrupted Blood incident](https://en.wikipedia.org/wiki/Corrupted_Blood_incident) where a programming bug in the Word of Warcraft (WoW) massive multiplayer online role-playing-game resulted in a virus-like disease spreading among the players. Epidemiologists then realized that there were many parallels between a real outbreak and this virtual outbreak in WoW, particularly in terms of human behaviors ([Balicer 2007](https://journals.lww.com/epidem/fulltext/2007/03000/modeling_infectious_diseases_dissemination_through.15.aspx); [Lofgren and Fefferman, 2007](<https://www.thelancet.com/journals/laninf/article/PIIS1473-3099(07)70212-8/fulltext>)).

![Corrupted Blood outbreak in WoW multiplayer game](./corrupted-blood.jpeg)

Back in the 1990s, work at the MIT Media Lab on [participatory simulations](http://alumni.media.mit.edu/~vanessa/part-sims/) using simple wearable devices called Thinking Tags demonstrated the application of proximity sensing to simulate virtual outbreaks in the physical world ([Colella, 2000](https://www.tandfonline.com/doi/abs/10.1207/S15327809JLS0904_4)). These simulations were ported over to Palm pilot devices, representing a direct predecessor to our Operation Outbreak project:

![Corrupted Blood outbreak in WoW multiplayer game](./virus-palm.jpeg)

> “Virus is the game that started it all. Everyone in the game initially appear to be healthy. Players are then given the task to meet as many people as possible without getting sick. Just how do you do that? That is what players must figure out. As the game proceeds some players get sick. Play again to try to determine how the virus works.” [Soloway et al., 2001](https://www.researchgate.net/publication/220426399_Handheld_Devices_are_Ready-At-Hand)

Even though today we can run very sophisticated epidemiological simulations on our computers, down to the level of the individuals inside a large city ([Aleta el al., 2020](https://www.nature.com/articles/s41562-020-0931-9)) or to up the entire world, incorporating mobility patterns within and between countries ([Chinazzi et al., 2020](https://science.sciencemag.org/content/368/6489/395)), participatory simulations where agents are actual people playing a realistic and engaging outbreak exercise are highly valuable because of the behavioral element they are able to incorporate:

> ‘Virtual outbreaks designed and implemented with public-health studies in mind have the potential to bridge the gap between traditional epidemiological studies on populations and computer simulations,involving both unprogrammed human behavior and large numbers of test participants in a controlled environment where the disease parameters are known.” (Lofgren and Fefferman)
