// import { useEffect, useState } from 'react';

// // material-ui
// import { Grid } from '@mui/material';

// // project imports
// import EarningCard from './EarningCard';
// import OrderCard from './OrderCard';
// import PopularCard from './PopularCard';
// import TotalIncomeLightCard from './TotalIncomeLightCard'
// // import CustomerCard from './CustomerCard'
// // import TotalOrderLineChartCard from './TotalOrderLineChartCard';
// // import TotalIncomeDarkCard from './TotalIncomeDarkCard';
// // import TotalIncomeLightCard from './TotalIncomeLightCard';
// import TotalGrowthBarChart from './TotalGrowthBarChart';
// import { gridSpacing } from 'store/constant';
// // import { Grade } from '@mui/icons-material';

// // ==============================|| DEFAULT DASHBOARD ||============================== //

// const Dashboard = () => {
//   const [isLoading, setLoading] = useState(true);
//   useEffect(() => {
//     setLoading(false);
//   }, []);

//   return (
//     <Grid container spacing={gridSpacing}>
//  <Grid item lg={8}>

//  <Grid container spacing={gridSpacing}>
//           <Grid item  md={6} sm={6} xs={12}>
//           <EarningCard isLoading={isLoading} />
//           </Grid>

//           <Grid item md={6} sm={6} xs={12}>
//           <OrderCard isLoading={isLoading} />
//           </Grid>

//           <Grid item xs={12} md={12}>
//             <TotalGrowthBarChart isLoading={isLoading} />
//           </Grid>
//   </Grid>

//  </Grid>

//  <Grid item lg={4} xs={12}>

//  <Grid container spacing={gridSpacing}>

//  <Grid item xs={12} md={12}>
//             <TotalIncomeLightCard isLoading={isLoading} />
//    </Grid>
//  <Grid item xs={12} md={12}>
//             <PopularCard isLoading={isLoading} />
//    </Grid>

//    </Grid>
//  </Grid>

//       {/* <Grid item xs={12}>
//         <Grid container spacing={gridSpacing}>
//           <Grid item lg={4} md={6} sm={6} xs={12}>
//           <EarningCard isLoading={isLoading} />

//           </Grid>
//           <Grid item lg={4} md={6} sm={6} xs={12}>
//           <OrderCard isLoading={isLoading} />
//           </Grid>
//           <Grid item lg={4} md={6} sm={6} xs={12}>

//           <CustomerCard isLoading={isLoading} />
//           </Grid>

//         </Grid>
//       </Grid> */}

// {/*
//       <Grid item xs={12}>
//         <Grid container spacing={gridSpacing}>
//           <Grid item xs={12} md={8}>
//             <TotalGrowthBarChart isLoading={isLoading} />
//           </Grid>

//           <Grid item xs={12} md={4}>
//             <PopularCard isLoading={isLoading} />
//           </Grid>

//         </Grid>
//       </Grid> */}
//     </Grid>
//   );
// };

// export default Dashboard;

import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
// import EarningCard from './EarningCard';
// import OrderCard from './OrderCard';
import PopularCard from './PopularCard';
import OrderAction from './OrderAction';
import PaymentAction from './PaymentAction';
import MyTeam from './MyTeam';
import Payment from './Payment';
import Orders from './Orders';
// import CustomerCard from './CustomerCard'
// import TotalOrderLineChartCard from './TotalOrderLineChartCard';
// import TotalIncomeDarkCard from './TotalIncomeDarkCard';
// import TotalIncomeLightCard from './TotalIncomeLightCard';
// import TotalGrowthBarChart from './TotalGrowthBarChart';
import { gridSpacing } from 'store/constant';
// import { Grade } from '@mui/icons-material';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item lg={4} xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={12}>
            <Orders isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={12}>
            <OrderAction isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>

      <Grid item lg={4} xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={12}>
            <Payment isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={12}>
            <PaymentAction isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>

      <Grid item lg={4} xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={12}>
            <MyTeam isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={12}>
            <PopularCard isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
