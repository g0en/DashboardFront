import React, { ReactNode } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";

interface ChartCardProps {
  title: string;
  children: ReactNode;
}

const StyledCard = styled(Card)({
  height: "100%",
  borderRadius: "20px",
  backgroundColor: "#FFF4DC",
  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s, box-shadow 0.3s",
  '&:hover': {
    transform: "scale(1.05)",
    boxShadow: "0px 15px 25px rgba(0, 0, 0, 0.2)",
  },
});

const StyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});

const StyledTypography = styled(Typography)({
  fontWeight: "bold",
  fontSize: "24px",
  marginBottom: "20px",
  color: "#333333",
  textAlign: "center",
});

const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  width: "100%",
});

const ChartCard: React.FC<ChartCardProps> = ({ title, children }) => {
  return (
    <StyledCard>
      <StyledCardContent>
        <StyledTypography>
          {title}
        </StyledTypography>
        <StyledBox>
          {children}
        </StyledBox>
      </StyledCardContent>
    </StyledCard>
  );
};

export default ChartCard;
