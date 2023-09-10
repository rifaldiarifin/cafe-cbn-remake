import { Line } from 'react-chartjs-2'

export const createDatasetLineViews = ({ label, data, borderColor }) => {
  return {
    label,
    data,
    fill: {
      target: 'origin',
      above: 'rgba(253, 119, 255, .05)', // Area will be red above the origin
      below: 'rgb(0, 0, 255)' // And blue below the origin
    },
    borderColor,
    backgroundColor: borderColor,
    tension: 0.4,
    order: 1000,
    pointHitRadius: 50,
    pointBorderWidth: 2,
    pointHoverBorderWidth: 3,
    pointHoverBorderColor: 'white',
    pointBorderColor: 'white',
    pointRadius: 1,
    pointHoverRadius: 8
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
        callback(value) {
          return `Rp ${parseInt(value).toLocaleString('id-ID', { currency: 'IDR' })},00`
        },
        font: {
          family: 'SecondFont',
          weight: 400
        }
      }
    },
    x: {
      ticks: {
        font: {
          family: 'SecondFont',
          weight: 400
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
      },
      callbacks: {
        label: (tooltipItem) => {
          return `${tooltipItem.dataset.label}: Rp ${parseInt(tooltipItem.raw).toLocaleString('id-ID', {
            currency: 'IDR'
          })},00`
        }
      }
    }
  }
}

const CustomLineChart = (props) => {
  const { labels, datasets } = props

  return <Line options={options} data={{ labels, datasets }} />
}

export default CustomLineChart
