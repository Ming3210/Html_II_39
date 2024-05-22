import React from 'react';

interface Job {
  id: number;
  name: string;
  status: boolean;
}

type FunctionType = {
  job: Job;
  handleChangeStatus: (id: number) => void;
  handleDelete: (id: number) => void;
};

export default function Content({ job, handleChangeStatus, handleDelete }: FunctionType) {
  const handleChecked = (id: number) => {
    handleChangeStatus(id);
  };

  const handleDeleteClick = (id: number) => {
    handleDelete(id);
  };

  return (
    <div>
      <div className="tab-content" id="ex1-content">
        <div className="tab-pane fade show active">
          <ul className="list-group mb-0">
            <li
              className="list-group-item d-flex align-items-center justify-content-between border-0 mb-2 rounded"
              style={{ backgroundColor: '#f4f6f7' }}
            >
              <div>
                <input
                  onChange={() => { handleChecked(job.id); }}
                  className="form-check-input me-2"
                  type="checkbox"
                  checked={job.status}
                />
                <span>
                  {job.status ? <s>{job.name}</s> : <span className='job'>{job.name}</span>}
                </span>
              </div>
              <div className="d-flex gap-3">
                <i className="fas fa-pen-to-square text-warning" />
                <i onClick={() => handleDeleteClick(job.id)} className="far fa-trash-can text-danger" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
