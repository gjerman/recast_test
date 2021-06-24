import React, { useEffect, useState } from "react";
import { Admin, DataProvider, Resource } from "react-admin";
import buildGraphQLProvider from "./data-provider/graphqlDataProvider";
import basicHttpAuthProvider from "./auth-provider/ra-auth-basic-http";
import { theme } from "./theme/theme";
import Login from "./Login";
import "./App.scss";
import Dashboard from "./pages/Dashboard";
import { UserList } from "./user/UserList";
import { UserCreate } from "./user/UserCreate";
import { UserEdit } from "./user/UserEdit";
import { UserShow } from "./user/UserShow";
import { DataTableList } from "./dataTable/DataTableList";
import { DataTableCreate } from "./dataTable/DataTableCreate";
import { DataTableEdit } from "./dataTable/DataTableEdit";
import { DataTableShow } from "./dataTable/DataTableShow";
import { ColumnMetaList } from "./columnMeta/ColumnMetaList";
import { ColumnMetaCreate } from "./columnMeta/ColumnMetaCreate";
import { ColumnMetaEdit } from "./columnMeta/ColumnMetaEdit";
import { ColumnMetaShow } from "./columnMeta/ColumnMetaShow";

const App = (): React.ReactElement => {
  const [dataProvider, setDataProvider] = useState<DataProvider | null>(null);
  useEffect(() => {
    buildGraphQLProvider
      .then((provider: any) => {
        setDataProvider(() => provider);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);
  if (!dataProvider) {
    return <div>Loading</div>;
  }
  return (
    <div className="App">
      <Admin
        title={"recast_test"}
        dataProvider={dataProvider}
        authProvider={basicHttpAuthProvider}
        theme={theme}
        dashboard={Dashboard}
        loginPage={Login}
      >
        <Resource
          name="User"
          list={UserList}
          edit={UserEdit}
          create={UserCreate}
          show={UserShow}
        />
        <Resource
          name="DataTable"
          list={DataTableList}
          edit={DataTableEdit}
          create={DataTableCreate}
          show={DataTableShow}
        />
        <Resource
          name="ColumnMeta"
          list={ColumnMetaList}
          edit={ColumnMetaEdit}
          create={ColumnMetaCreate}
          show={ColumnMetaShow}
        />
      </Admin>
    </div>
  );
};

export default App;
