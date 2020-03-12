import React, { useEffect, useState } from 'react';
import { Column } from 'material-table';
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { AppState } from '../../redux/reducers/rootReducer';
import { fetchReportedCasesStart, fetchReportCasesSuccess, fetchReportCasesError } from "../../redux/reducers/reportedCaseReducer";
import { fetchReportedCases } from "../../api/reportedCasesApi";
import Table from "../../common/Table";

interface Row {
  name: string;
  email: string;
  bikeFrameNumber: string;
  resolvedCase: boolean;
}


const ReportedCaseList = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState<Row[]>([])
  const columns: Column<Row>[] = [
    { title: 'Name', field: 'name' },
    { title: 'Email', field: 'email' },
    { title: 'Bike frame number', field: 'bikeFrameNumber' },
    { title: 'Resolved case', field: 'resolvedCase' }]

  const { loading, username } = useSelector((state: AppState) => {
    return {
      loading: state.reportedCaseReducer.loading,
      reportedCases: state.reportedCaseReducer.reportedCases,
      username: state.reportedCaseReducer.username,
    }
  }, shallowEqual);


  useEffect(() => {
    async function getReportedCasesList() {
      try {
        dispatch(fetchReportedCasesStart())
        const reportedCasesList = await fetchReportedCases(username);
        dispatch(fetchReportCasesSuccess(reportedCasesList))
        const dataTable: Row[] = reportedCasesList.map(e => ({
          name: e.name,
          email: e.email,
          bikeFrameNumber: e.bike_frame_number,
          resolvedCase: e.case_resolved
        }));
        setData(dataTable);
      } catch (error) {
        let errorMessage = "Internal Server Error";
        if (error.response) {
          errorMessage = error.response.data.message;
        }
        dispatch(fetchReportCasesError(errorMessage))
      }
    }
    getReportedCasesList()
  }, [username, dispatch])

  return (
    <Table loading={loading} data={data} columns={columns} />
  )


}


export default ReportedCaseList;