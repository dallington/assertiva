import React from "react";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { ListStoreType, StoreType } from "../../types";
import useStyles from "./style";
import { numberStringUnformatter } from "../../utils/numberStringFormatter";

function ListStore({ stores, minimalRevenue = "0" }: ListStoreType) {
  const classes = useStyles();

  const minimalRevenueNumber = numberStringUnformatter(minimalRevenue);

  const isLowerRevenue = (revenue: number): string => {
    return revenue < minimalRevenueNumber ? "isLowerRevenue" : "";
  };

  return (
    <div className="teste">
      <List className={classes.list}>
        <ListItem className={`${classes.itemHeader} ${classes.item}`}>
          <span>Loja</span>
          <span>Faturamento</span>
        </ListItem>
        {stores.length &&
          stores.map((store: StoreType) => {
            return (
              <ListItem
                className={`${classes.item} ${isLowerRevenue(store.revenue)}`}
                key={store.name}
              >
                <span>{store.name}</span>
                <span>R$ {store.revenue.toLocaleString()}</span>
              </ListItem>
            );
          })}
        {!stores.length && (
          <ListItem
            className={`${classes.item} ${classes.noSearch}`}
            id="emptyStore"
          >
            Nenhuma loja encontrada
          </ListItem>
        )}
      </List>
    </div>
  );
}

export default ListStore;
