import React, { FC } from "react";
import styles from "./SkeletonComp.module.css";
import { Card, Skeleton, SkeletonText } from "@chakra-ui/react";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SkeletonCompProps {}

const SkeletonComp: FC<SkeletonCompProps> = () => {
  return (
    <Card className={styles["skeleton__card"]}>
      <Skeleton isLoaded={false} w="100%" h="100px" />
      <SkeletonText
        mt="10px"
        noOfLines={2}
        spacing="4"
        skeletonHeight="4"
        width="100%"
      />
      <Skeleton mt="10px" w="100%" h="40px" />
    </Card>
  );
};

export default SkeletonComp;
