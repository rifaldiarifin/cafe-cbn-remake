import { Doughnut } from 'react-chartjs-2'

// const overviewData = {
//     barLabel: ["Hero", "About Me", "My Skills", "My Projects", "Contact Me"],
//     barValue: document.getElementById("overview").dataset.chart1.split(", "),
//     backgroundColor: [
//         'rgba(242, 99, 234, .6)',
//         'rgba(199, 104, 252, .6)',
//         'rgba(136, 105, 229, .6)',
//         'rgba(104, 124, 252, .6)',
//         'rgba(95, 172, 245, .6)'
//     ],
// };

export const createDatasetDoughnut = ({ label, data, backgroundColor }) => {
  return {
    label,
    data,
    backgroundColor,
    offset: 6,
    borderRadius: 4
  }
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  elements: {
    arc: {
      borderWidth: 0
    }
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
      callbacks: {
        title: (callback) => {
          return `${callback[0].label.length > 18 ? callback[0].label.substring(0, 15) + '...' : callback[0].label}`
        }
      },
      bodyFont: {
        family: 'SecondFont'
      }
    }
  }
}

const CustomDoughnutChart = (props) => {
  const { labels, datasets } = props
  return <Doughnut options={options} data={{ labels, datasets }} {...props} />
}

export default CustomDoughnutChart
