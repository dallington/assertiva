/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable jsx-props-no-spreading

import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  AppBar,
  Container,
  Grid,
  Typography,
  Toolbar,
  TextField,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import ListStore from "./components/ListStore";
import Map from "./components/Map";
import Stores from "./mocks/stores";
import numberStringFormatter from "./utils/numberStringFormatter";
import usePaginator from "./hooks/usePaginator";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    container: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: `${theme.spacing(3)} 0`,
    },
    wrapperPagination: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: theme.spacing(3),
    },
    wrapperRevenue: {
      order: -1,
      [theme.breakpoints.up("md")]: {
        order: 0,
      },
    },
  })
);

export default function App() {
  const classes = useStyles();
  const { stores } = Stores;
  const [minimalRevenue, setMinimalRevenue] = useState("");
  const [searchStore, setSearchStore] = useState("");
  const { currentPage, ...paginator } = usePaginator(stores);

  React.useEffect(() => {
    paginator.slice();
  }, [currentPage]);

  function handlePagination(evt: React.ChangeEvent<unknown>, value: number) {
    paginator.setCurrentPage(value);
  }

  function handleMinimalRevenue(event: React.ChangeEvent<HTMLInputElement>) {
    setMinimalRevenue(numberStringFormatter(event.target.value));
  }

  function handleSearchStore(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchStore(event.target.value);
    paginator.searchStoreData(event.target.value);
  }

  const defaultPropsMap = {
    center: {
      lat: -23.609215,
      lng: -46.667182,
    },
    zoom: 11,
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Container>
            <Typography variant="h5" component="h1" className={classes.title}>
              Desempenho das Lojas
            </Typography>
          </Container>
        </Toolbar>
      </AppBar>
      <Container className={classes.container}>
        <Grid container className={classes.root} spacing={4}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Pesquise pelo nome da loja"
              placeholder=""
              fullWidth
              margin="normal"
              variant="outlined"
              value={searchStore}
              onChange={handleSearchStore}
            />
          </Grid>
          <Grid item xs={12} md={6} className={classes.wrapperRevenue}>
            <TextField
              label="Digite um Faturamento Mínimo Esperado"
              margin="normal"
              variant="outlined"
              type="text"
              fullWidth
              onChange={handleMinimalRevenue}
              value={minimalRevenue}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ListStore
              stores={paginator.filteredData}
              minimalRevenue={minimalRevenue}
            />
            {paginator.totalPages > 0 && (
              <div className={classes.wrapperPagination}>
                <Pagination
                  count={paginator.totalPages}
                  size="small"
                  page={currentPage}
                  siblingCount={3}
                  onChange={handlePagination}
                />
              </div>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <Map
              data={searchStore.length > 0 ? paginator.filteredData : stores}
              minimalRevenue={minimalRevenue}
              height="450px"
              {...defaultPropsMap}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
