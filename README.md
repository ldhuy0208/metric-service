# Metric Service
This is a service to tracking the Metrics.

## Project setup
1. Clone the repository
2. Install dependencies by: yarn
3. Create the .env file and fill the variables
4. Run the prisma DTO generation by: npx prisma generate
5. Run the prisma seed by: yarn prisma:seed (if you want to seed the database)
6. Run the project by: yarn start:dev

For second time, just need to run the: yarn start:dev

## Features
1. Create a metric: the system can create a new metric with a value in a specific time by unit.
2. Get metrics by metric type: the system can get pagination metric list by metric type id and unit id (optional).
3. Get metric data for the chart: the system can show lasted metric data in a day for a specified time period, the chart by metric type id and unit id (optional).

## Highlights
1. This project put the Metric Type (Temperature, Distance) and Unit (Celsius, Meter,..) in the database. So that, it can be easily scaled to support more metric types and units.

## Rules for data seeding in database
1. One Metric Type must have one base Unit (flag is_base in Unit table).
2. The fromBaseFormula and toBaseFormula must be valid JavaScript expressions (System is using eval() function). 

## Improvements/ Enhancements
1. We can cache the Metric Type and Unit data in Redis to improve the performance.
2. We need to convert the value of the metric from base to display unit and reverse carefully, there is might be an mismatch in the rounding calculation.
3. The timezone of the metric value and the chart.
4. Manage the version of the metric value incase some of metric value can be changed frequently (such as Currency).