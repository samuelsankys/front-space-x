import ReactApexChart from 'react-apexcharts';
import { baseURL } from '../../utils/constantes';
import { useFetch } from '../../useFetch';
import { useEffect, useState } from 'react';

const optionsPie = {
  chart: {
    type: 'donut',
  },
  colors: ['#554298', '#FF33FF', '#FEB019', '#58FFC5'],
  responsive: [{
    breakpoint: 480,
    options: {

      legend: {
        position: 'bottom'
      }
    }
  }],
  
};

const LaunchPieChart = ({onSuccess, onFailed}) => {
  const {data, loading} = useFetch(baseURL + '/launches/stats/rocket')
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState(optionsPie);

  useEffect(() => {
    if (data) {
      const series = data.launches.map((item)=> item.total)
      const labels = data.launches.map((item)=>item.name)
      onSuccess(data.success);
      onFailed(data.failed);
      setSeries(series)
      setOptions((prevState) => ({
        ...prevState,
        labels: labels,
      }));
    }
  }, [data]);
  
 

  return (
    <div id="launch-chart">
      {loading && <p>Loading ...</p>} 
      <ReactApexChart width={'100%'} options={options} series={series} type="donut" height={200} />
    </div>
  );
};

export default LaunchPieChart;