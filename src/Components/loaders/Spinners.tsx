import React from "react";
import { CirclesWithBar } from "react-loader-spinner";
import styles from './Spinners.module.css'
const Spinners = () => {
  return (
    <>
      <CirclesWithBar
        height="100"
        width="100"
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass={styles.spinners}
        visible={true}
        outerCircleColor=""
        innerCircleColor=""
        barColor=""
        ariaLabel="circles-with-bar-loading"
        
      />
    </>
  );
};

export default Spinners;
