import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      border: "1px solid #ccc",
      padding: 0,
      boxShadow: theme.shadows[1],
    },
    item: {
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: theme.palette.background.paper,
      borderBottom: "1px solid #ccc",
      fontWeight: 500,
      fontSize: "14px",
      "&:last-child": {
        borderColor: "transparent",
      },
    },
    itemHeader: {
      fontSize: "17px",
      fontWeight: "bold",
    },
    noSearch: {
      color: theme.palette.error.main,
    },
  })
);

export default useStyles;
