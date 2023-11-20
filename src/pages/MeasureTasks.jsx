import TaskHeader from "../components/measure/TaskHeader";
import TaskTable from "../components/measure/TaskTable";
import AddNewTaskModal from "../components/measure/AddNewTaskModal";
import { useQuery } from "@tanstack/react-query";
import { memo, useEffect, useState } from "react";
import { supabase } from "../supabase";
import ViewTaskModal from "../components/measure/ViewTaskModal";

const MeasureTasks = () => {
  const [order, setOrder] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [orderView, setOrderView] = useState(null);

  const {
    isLoading,
    isError,
    data: dataList,
    error,
  } = useQuery({
    queryKey: [refresh],
    queryFn: fetchData,
    select: (data) => data.filter(({ sales_manager }) => sales_manager),
  });

  async function fetchData() {
    let { data, error } = await supabase.from("orders").select("*");
    return data;
  }

  const Modal = memo(function Modal({ order }) {
    if (typeof order == "number" && dataList) {
      let newData = dataList
        ? dataList.filter(({ id }) => id === order)[0]
        : null;

      return <AddNewTaskModal formData={newData} setRefresh={setRefresh} />;
    } else return;
  });
  const ModalView = memo(function Modal({ orderView }) {
    if (typeof orderView == "number" && dataList) {
      let newData = dataList
        ? dataList.filter(({ id }) => id === orderView)[0]
        : null;

      return <ViewTaskModal orderData={newData} setOrderView={setOrderView} />;
    } else return;
  });
  return (
    <div className="main-content">
      <div className="row">
        <div className="col-12">
          <div className="panel">
            <TaskHeader setRefresh={setRefresh} />
            <div className="panel-body">
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                dataList && (
                  <TaskTable
                    dataList={dataList}
                    setOrder={setOrder}
                    setOrderView={setOrderView}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal order={order} />
      <ModalView orderView={orderView} />
    </div>
  );
};

export default MeasureTasks;
