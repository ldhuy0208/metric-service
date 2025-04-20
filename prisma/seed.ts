import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clean up existing data if needed
  await prisma.metricValue.deleteMany({});
  await prisma.unit.deleteMany({});
  await prisma.metricType.deleteMany({});

  console.log('Seeding database...');

  // Create Distance metric type
  const distanceType = await prisma.metricType.create({
    data: {
      name: 'Distance',
    },
  });

  // Create Temperature metric type
  const temperatureType = await prisma.metricType.create({
    data: {
      name: 'Temperature',
    },
  });

  console.log('Created metric types:', { distanceType, temperatureType });

  // Create Distance units
  const meterUnit = await prisma.unit.create({
    data: {
      metricTypeId: distanceType.id,
      name: 'Meter',
      symbol: 'm',
      isBase: true,
      toBaseFormula: 'value',         // Identity formula (value → value)
      fromBaseFormula: 'value',       // Identity formula (value → value)
    },
  });

  const centimeterUnit = await prisma.unit.create({
    data: {
      metricTypeId: distanceType.id,
      name: 'Centimeter',
      symbol: 'cm',
      isBase: false,
      toBaseFormula: 'value / 100',   // cm to m: divide by 100
      fromBaseFormula: 'value * 100', // m to cm: multiply by 100
    },
  });

  const inchUnit = await prisma.unit.create({
    data: {
      metricTypeId: distanceType.id,
      name: 'Inch',
      symbol: 'in',
      isBase: false,
      toBaseFormula: 'value * 0.0254',   // inch to m: multiply by 0.0254
      fromBaseFormula: 'value / 0.0254', // m to inch: divide by 0.0254
    },
  });

  const feetUnit = await prisma.unit.create({
    data: {
      metricTypeId: distanceType.id,
      name: 'Feet',
      symbol: 'ft',
      isBase: false,
      toBaseFormula: 'value * 0.3048',   // feet to m: multiply by 0.3048
      fromBaseFormula: 'value / 0.3048', // m to feet: divide by 0.3048
    },
  });

  const yardUnit = await prisma.unit.create({
    data: {
      metricTypeId: distanceType.id,
      name: 'Yard',
      symbol: 'yd',
      isBase: false,
      toBaseFormula: 'value * 0.9144',   // yard to m: multiply by 0.9144
      fromBaseFormula: 'value / 0.9144', // m to yard: divide by 0.9144
    },
  });

  // Create Temperature units
  const kelvinUnit = await prisma.unit.create({
    data: {
      metricTypeId: temperatureType.id,
      name: 'Kelvin',
      symbol: 'K',
      isBase: true,
      toBaseFormula: 'value',           // Identity formula (value → value)
      fromBaseFormula: 'value',         // Identity formula (value → value)
    },
  });

  const celsiusUnit = await prisma.unit.create({
    data: {
      metricTypeId: temperatureType.id,
      name: 'Celsius',
      symbol: '°C',
      isBase: false,
      toBaseFormula: 'value + 273.15',    // °C to K: add 273.15
      fromBaseFormula: 'value - 273.15',  // K to °C: subtract 273.15
    },
  });

  const fahrenheitUnit = await prisma.unit.create({
    data: {
      metricTypeId: temperatureType.id,
      name: 'Fahrenheit',
      symbol: '°F',
      isBase: false,
      toBaseFormula: '(value - 32) * 5/9 + 273.15',  // °F to K: (°F - 32) * 5/9 + 273.15
      fromBaseFormula: '(value - 273.15) * 9/5 + 32', // K to °F: (K - 273.15) * 9/5 + 32
    },
  });

  console.log('Created distance units:', { meterUnit, centimeterUnit, inchUnit, feetUnit, yardUnit });
  console.log('Created temperature units:', { kelvinUnit, celsiusUnit, fahrenheitUnit });

  console.log('Database seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
