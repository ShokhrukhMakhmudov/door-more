import TaskHeader from "../components/call-center/TaskHeader";
import TaskTable from "../components/call-center/TaskTable";
import AddNewTaskModal from "../components/call-center/AddNewTaskModal";
// import EditTaskModal from "../components/modal/EditTaskModal";
import ViewTaskModal from "../components/call-center/ViewTaskModal";
import { memo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase";

const CallCenterTasks = () => {
  const [refresh, setRefresh] = useState(false);
  const [order, setOrder] = useState(null);

  const {
    isLoading,
    isError,
    data: dataList,
    error,
  } = useQuery({
    queryKey: [refresh],
    queryFn: fetchData,
  });
  console.log(dataList);
  async function fetchData() {
    let { data, error } = await supabase.from("orders").select("*");
    console.log(data);
    return data;
  }

  const Modal = memo(function Modal({ order }) {
    if (typeof order == "number" && dataList) {
      let newData = dataList
        ? dataList.filter(({ id }) => id === order)[0]
        : null;

      return (
        <ViewTaskModal
          orderData={newData}
          setRefresh={setRefresh}
          setOrder={setOrder}
        />
      );
    } else return;
  });
  return (
    <div className="main-content">
      <div className="row">
        <div className="col-12">
          <div className="panel">
            <TaskHeader setRefresh={setRefresh} />
            <div className="panel-body">
              {/* <TaskTableFilter /> */}
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                dataList && (
                  <TaskTable dataList={dataList} setOrder={setOrder} />
                )
              )}
            </div>
          </div>
        </div>
      </div>
      <AddNewTaskModal setRefresh={setRefresh} />
      <Modal order={order} />
      {/* <EditTaskModal />
       */}
      {/* <Footer /> */}
    </div>
  );
};

export default CallCenterTasks;
