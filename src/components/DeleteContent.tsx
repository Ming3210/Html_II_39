import React from 'react';

interface Job {
  id: number;
  name: string;
  status: boolean;
}

type DeleteContent = {
  jobDelete: any ;
  deleteJob: () => void;
  cancelDelete: () => void;
};

export default function DeleteContent({ jobDelete, deleteJob, cancelDelete }: DeleteContent) {

  return (
    <div className="overlay">
      <div className="modal-custom">
        <div>
          <div className="modal-header-custom">
            <h5>Xác nhận</h5>
            <i className="fas fa-xmark" onClick={cancelDelete} />
          </div>
          <div className="modal-body-custom">
            <p>Bạn chắc chắn muốn xóa công việc {jobDelete.name}</p>
          </div>
        </div>
        <div className="modal-footer-footer">
          <button className="btn btn-light" onClick={cancelDelete}>Hủy</button>
          <button className="btn btn-danger" onClick={deleteJob}>Xóa</button>
        </div>
      </div>
    </div>
  );
}
