import TaskHeader from "../components/sales_manager/TaskHeader";
import TaskTable from "../components/sales_manager/TaskTable";
import AddNewTaskModal from "../components/sales_manager/AddNewTaskModal";

import { memo, useEffect, useState } from "react";
import { supabase } from "../supabase";

const ManagerTasks = () => {
  const [order, setOrder] = useState(null);
  const [formData, setFormData] = useState(null);
  const [dataList, setDataList] = useState(null);
  useEffect(() => {
    async function fetchData() {
      let { data: orders, error } = await supabase.from("orders").select("*");
      setDataList(orders);
    }
    fetchData();
  }, []);

  const Modal = memo(function Modal({ order }) {
    if (typeof order == "number" && dataList) {
      let newData = dataList
        ? dataList.filter(({ id }) => id === order)[0]
        : null;

      return <AddNewTaskModal formData={newData} />;
    } else return;
  });

  return (
    <div className="main-content">
      <div className="row">
        <div className="col-12">
          <div className="panel">
            <TaskHeader />
            <div className="panel-body">
              {dataList ? (
                <TaskTable dataList={dataList} setOrder={setOrder} />
              ) : (
                <>
                  <div>Loading...</div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal order={order} />
    </div>
  );
};

export default ManagerTasks;
