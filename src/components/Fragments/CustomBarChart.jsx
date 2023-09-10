import { Bar } from 'react-chartjs-2'

export const createDatasetBar = ({ label, data, backgroundColor }) => {
  return {
    label,
    data,
    fill: {
      target: 'origin',
      above: 'rgba(253, 119, 255, .05)', // Area will be red above the origin
      below: 'rgb(0, 0, 255)' // And blue below the origin
    },
    backgroundColor
  }
}
const options = {
  responsive: true,
  maintainAspectRatio: false,
  animations: {
    y: {
      easing: 'easeInOutElastic',
      from: (ctx) => {
        if (ctx.type === 'data') {
          if (ctx.mode === 'default' && !ctx.dropped) {
            ctx.dropped = true
            return 0
          }
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        font: {
          family: 'SecondFont'
        }
      }
    },
    x: {
      ticks: {
        font: {
          family: 'SecondFont'
        }
      }
    }
  },
  layout: {
    padding: 20
  },
  plugins: {
    title: {
      display: false
    },
    legend: {
      display: false
    },
    tooltip: {
      backgroundColor: 'rgba(51, 51, 51, 0.5)',
      padding: 10,
      cornerRadius: 10,
      borderColor: 'rgba(255, 255, 255, 0.3)',
      borderWidth: '1',
      titleFont: {
        weight: 400,
        size: 12,
        family: 'MainFont'
      },
      bodyFont: {
        family: 'SecondFont'
      }
    }
  }
}

const CustomBarChart = (props) => {
  const { labels, datasets } = props

  return <Bar options={options} data={{ labels, datasets }} />
}

export default CustomBarChart
