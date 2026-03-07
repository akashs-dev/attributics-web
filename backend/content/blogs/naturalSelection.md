---
title: "The Natural Selection — CDP Stack."
subtitle: ""
publishedAt: "2025-07-23"
readTime: "3 min read"
author:
  name: "Vakesh Singh"
  avatar: https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Salmanrampwalk.png/250px-Salmanrampwalk.png
heroImage: https://static.wixstatic.com/media/9e275a_c706995df85848ffb3b043130fe71de1~mv2.png/v1/fill/w_454,h_341,fp_0.50_0.50,q_95,enc_avif,quality_auto/9e275a_c706995df85848ffb3b043130fe71de1~mv2.png
featured: false
category: 'AI'
meta: 'blog'
---

## Is The CDP Space Evolving ?

"On the Origin of Species", published in 1859, Darwin presented evidence and arguments for the idea that species evolve over time through a process of Natural Selection ( Survival of fittest). Fitness in this context was the ability of the organism to survive and reproduce in a specific environment rather than physical dominance

Fitness in the context of MarTech SAAS is its ability to provide value to the customer. MarTech SAAS promises to drive value in terms of improved customer experience and increased marketing ROI.

Building a meaningful customer experience and improving ROI involves navigating both unknown and known moments of the customer through a mix of Data Strategy, Analytics , Personalisation, and Channel expertise. Brands have been investing heavily in Customer Data Platforms (referred as CDP henceforth) to realize these objectives

## Traditional Customer Data Platforms

Gartner defines Customer Data Platform (CDP) as a software platform that creates a persistent, unified customer view accessible to other systems. It collects and manages data from various sources, such as websites, mobile apps, CRM systems, legacy systems, data warehouse and other channels, to provide a comprehensive profile of each customer to downstream activation channels.

CDPs are designed to enable marketers and other users to leverage this unified customer data for various purposes, including personalization, analytics, and marketing automation and media activation.

As per gartner a CDP platform at minimum has following components:-

- **Data Collection** :- Ingest first-party customer data from multiple sources and formats, online and offline, in real time and without limits on storage. This includes both anonymous and known first-party identifiers, behaviors and attributes.
- **Profile Unification** :- Consolidate customer profiles at the person level and connect attributes to identities.
- **Activation** :- The ability to send cohorts / segments, for activating them, to engagement tools for email campaigns, mobile messaging and advertising, personalisation among others
- **Segmentation** :- An interface that enables the marketer to create and manage segments or audiences
- **Integrations** :- Ability to connect data sources and activation channels with CDP infrastructure.
- **Data Taxonomy Management** :- A representation of how a customer data model is structured and which attributes and dimensions to include in a profile.
- **Analytic Reporting** :- Performance analysis for various levels of customer data, such as the attribute level, profile level or segment level.


## Traditional CDP Architecture

![Traditional CDP Architecture](https://static.wixstatic.com/media/9e275a_dfb895a8505a4b7cb9018e06c06d5ec3~mv2.png/v1/fill/w_814,h_406,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/9e275a_dfb895a8505a4b7cb9018e06c06d5ec3~mv2.png)

Above is the high level architecture diagram for a Traditional CDP integarated with MarTech architecture. In the above scenario customer data may be duplicated in both the Enterprise Data Warehouse (EDW) and the CDP infrastructure.

## Composable CDPs — The Evolution

The Unbundling of CDPs is where the storage of data (customer data, streaming data, Transaction data etc) is not within the purview of the CDP platform. The native data warehouse (Snowflake/ databricks/ GCP/ AWS etc) is used to store and analyze all forms of data. As mentioned by CEO of ActionIQ Tasso “This is important to prevent data copies (for real, not just using funny words), reduce costs, and support the spirit of data centralisation that the cloud data warehouse represent” ( https://bit.ly/3uQW3X4 )

The functions of CDP such as customer identity / unifying data can be built using modules from AWS/ GCP entity resolution within the client infrastructure rather than within the tradtional/ bundled CDP. The core feature of segmentation and activation (reverse ETL) is built in within the composable cdp stack.

The Real Time CDP with Materialize and Census

![Real Time Composable CDP](https://static.wixstatic.com/media/9e275a_a2d4f1beba7e4f2aae886bfcbb20bc52~mv2.png/v1/fill/w_814,h_237,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/9e275a_a2d4f1beba7e4f2aae886bfcbb20bc52~mv2.png)

Materialize + Census = Real-Time Composable CDP

Above is the high level architcture diagram of a “real time composable CDP” (Census) integrated with a data warehouse (Materialize)


## Why Composable CDPs

There is a need to centralize all customer data around the data warehouse as it becomes critical to avoid having multiple copies of data both across the customer’s own infrastructure and even more across 3rd party bundled CDPs. Data copies create security risks , makes data governance complicated and increases data storage and egresscosts.

Once available to large enterprises, data warehouses today are accessible to data engineering teams of all sizes. Data warehouses can store data from all sources, different lines of business of the organization and can be designed to act as a single source of truth.

With a traditional (bundled) CDP there is a need to sync data between warehouse and CDP storage which creates a misaligned source of truth. As mentioned by Tejas Manohar Founder Hightouch in his blog “Friends Don’t Let Friends Buy a CDP” “Marketing’s CDP-based “truth” became increasingly incomplete and misaligned with the truth as defined by analysts in the data warehouse”

![“Friends Don’t Let Friends Buy a CDP](https://static.wixstatic.com/media/9e275a_c06262c7461649d0833a9648f1a9ffff~mv2.png/v1/fill/w_814,h_466,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/9e275a_c06262c7461649d0833a9648f1a9ffff~mv2.png)


## Differentiation Of Composable And Bundled (Traditional) CDP

![Composable And Bundled (Traditional) CDP](https://static.wixstatic.com/media/9e275a_1f504e9842b7455dbe337c0d690208db~mv2.png/v1/fill/w_784,h_1080,al_c,q_90,enc_avif,quality_auto/9e275a_1f504e9842b7455dbe337c0d690208db~mv2.png)


## Challenges Till Date With Traditional CDP Programs

Following are few challenges with the traditional CDP programs:-

- The Evaluation of different CDP solutions (Adobe RTB, Segment etc) turned into a consulting project in itself. This was necessary to understand the current technology landscape for integration with CDP infrastructure.
- The Implementation program sometimes turned into a massive software development project with teams missing out on the core business objectives and use case.
- The TCO (The Total cost of Order) of the CDP program made it harder to extract ROI with higher capex upfront
- The time to market for the first use case was sometimes as high as 8-10 weeks.
- There was a huge gap from value articulation during a sales pitch to actual value realization from a sucessful CDP platform ( couple of years down the line).

Among the core challenges of CDP programs, maximizing return on investment (ROI) and ensuring tangible value realization stand out as central concerns.


## Value Realization With Composable CDP

The composable approach allows you to design a modular stack with full control of data collection, storage, modelling, and activation. It gives you immediate access to any of your data–not just your clickstream events. And finally, as it is tech agnostic it easily adapts to future infrastructure changes so you can avoid tech-debt and vendor lock-in.

The following are core benefits of a well-designed composable stack:-

- Reduced Cost:- Reduced TCO as the cost of the modular stack goes down (as you can reuse existing stack). The data storage cost goes down in a true zero-copy design as data is not replicated and hence reduction in storage, Egress and data governance costs
- Faster time to market :- As the approach is “data warehouse to activation” you can deploy the use case faster to market
- Focus on business outcomes :- The modularity of this architecture enables you to think in terms of use cases rather than “technology stacks.” Too many organizations have marketing use cases they need to solve, but they end up thinking too broadly in terms of technologies, not realizing that they simply need a way to activate their existing data.

Your decision to implement a new technology should be directly linked to the business value you’re trying to drive, and the work of your data team should be linked to the use cases they’re facilitating–not infrastructure.


## Ideal Client Profile For Composable CDP

While there could be benefits from the composable CDP route, not all clients are ideal profiles for starting this program

- Clients with Data Warehouse Set-Up :- Digital Native clients and Emerging enterprise clients with a well-designed data warehouse are ideal for starting on a composable stack journey.
- Multiple incoming data sources:- Clients who have use cases to unify data coming from multiple sources and have already implemented a marketing automation platform (MoEngage / CleverTap/ Braze/SFMC) setting up a composable cdp would yield better ROI
- Multiple Activations:- Clients with need for Multiple destinations such as personalisation, UX / feature testing, chatbots, write back to data warehouse , enabling a composable CDP with reverse ETL would improve ROI and efficiencies
- Clients Needing Custom ML/LLM Models : — Clients looking to leverage machine learning (ML) or large language models (LLMs) for predictive analytics, customer segmentation, or personalization can benefit from a composable CDP. By training ML/LLM models on native data warehouse data and external data clients can develop and deploy custom models more efficiently. They can then activate these models on downstream marketing platforms to deliver personalized experiences and optimize marketing strategies. Such clients also can go for a full fledged CDP where models needs to be trained on EDW + CDP data and single source of truth needs to be created on either of the platforms
- Technology talent :- Enterprise clients who are digital migrators would prefer and create more value from a traditional (bundled)CDP with a platform play which has multiple solutions integrated (CDP, marketing Automation, Experience etc).

## Summary

The choice between a traditional/ bundled and composable Customer Data Platform (CDP) isn’t about determining a winner or a loser. Instead, it’s about understanding the brand’s use cases, current technology platforms, and the available talent pool.

For businesses seeking a robust, out-of-the-box platform solution with streamlined implementation and PS support, a traditional/bundled CDP would be a good choice. These platforms offer comprehensive features and functionalities designed to meet a wide range of requirements from data unification to activation journeys, making them well-suited for organizations looking for a turnkey solution without extensive technical expertise.

On the other hand, brands with EDW (Enterprise Data Warehouse) implementations who have customer , transactional , and other business data flowing in cloud storage can quickly actionize activation use cases straight from the warehouse. This is a more efficient route with faster to market and more value realization for dollar investment.

Ultimately , irrespective of the route it is important to define use cases , design value articulation frameworks and business outcomes as few key prerequisites before starting on the cdp program.

