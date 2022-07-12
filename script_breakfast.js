console.log('test')
const numbers = [4, 2, 5, 1, 3, 8, 4, 9, 22, 10];
numbers.sort((a, b) => b - a);
console.log(numbers);

async function handleData() {

  const svg = d3.select('#svg_breakfast')

  let data = await d3.json('cereal.json')

  const margin = { top: 20, right: 20, bottom: 20, left: 40 }
  const width = 800 - (margin.left + margin.right)
  const height = 800 - (margin.top + margin.bottom)

  const getHighestRated = (data) => {
    const cerealList = Array.from(data.sort((a, b) => b.rating - a.rating));
    // console.log(cerealList)
    const newArray = cerealList.slice(0,5)
    console.log(newArray)
    return newArray
  }
  const cereal5 = getHighestRated(data)
  
  topNames = cereal5.map((cereal) => cereal.name)
  // console.log(topNames)

  //x scale
  const xScale = d3.scaleBand()
    .domain(cereal5.map(d=> d.name))
    .range([margin.left, width + margin.left])
    .padding(0.1)

  const yDataExtent = d3.extent(data, d => parseInt(d.potass))

  const yScale = d3.scaleLinear()
    .domain(yDataExtent)
    .range([height, margin.bottom])

  const colours = ['#fafa6e', '#92dc7e', '#39b48e', '#00898a', '#215d6e']

  const barGroup = svg.append('g')

  barGroup
    .selectAll('rect')
    .data(cereal5)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d, i) => xScale(d.name))
    .attr('y', d => yScale(parseInt(d.potass)))
    .attr('fill', (d, i) => colours[i])
    .attr('height', d => height - yScale(parseInt(d.potass)))
    .attr('width', xScale.bandwidth())

    const verticalAxis = d3.axisLeft(yScale)
      .tickFormat(d3.format('.2s'))
    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(verticalAxis)

    const bottomAxis = d3.axisBottom(xScale)
    svg
      .append('g')
      .attr('transform', `translate(${0}, ${height})`)
      .call(bottomAxis)

}

handleData()