import React, { FormEvent, useState, useEffect } from 'react';
import Navbar from './Navbar';
import Content from './Content';
import WarnContent from './WarnContent';
import DeleteContent from './DeleteContent';

interface Job {
  id: number;
  name: string;
  status: boolean;
}

export default function Session() {
  const [job, setJob] = useState<string>('');
  const [active, setActive] = useState<boolean>(false);
  const [jobLocal, setJobLocal] = useState<Job[]>(() => {
    const listJobLocal = localStorage.getItem('jobs');
    const listJob = listJobLocal ? JSON.parse(listJobLocal) : [];
    return listJob;
  });
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [jobToDelete, setJobToDelete] = useState<Job | null>(null);

  useEffect(() => {
    localStorage.setItem('jobs', JSON.stringify(jobLocal));
  }, [jobLocal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setJob(e.target.value);
  };

  const addJob = (e: FormEvent) => {
    e.preventDefault();
    if (job) {
      const newJob: Job = {
        id: Math.floor(Math.random() * 999999999999999999),
        name: job,
        status: false,
      };
      setJobLocal([...jobLocal, newJob]);
      setJob('');
      setActive(!active);
    }
  };

  const handleChangeStatus = (id: number) => {
    const updatedJobs = jobLocal.map((job) =>
      job.id === id ? { ...job, status: !job.status } : job
    );
    setJobLocal(updatedJobs);
    setActive(!active);
  };

  const handleDelete = (id: number) => {
    const job = jobLocal.find((job) => job.id === id);
    if (job) {
      setJobToDelete(job);
      setShowDelete(true);
    }
  };

  const deleteJob = () => {
    if (jobToDelete) {
      const updatedJobs = jobLocal.filter((job) => job.id !== jobToDelete.id);
      setJobLocal(updatedJobs);
      setShowDelete(false);
    }
  };

  const cancelDelete = () => {
    setShowDelete(false);
  };

  return (
    <div>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card">
                <div className="card-body p-5">
                  <form className="d-flex justify-content-center align-items-center mb-4" onSubmit={addJob}>
                    <div className="form-outline flex-fill">
                      <input
                        value={job}
                        type="text"
                        onChange={handleChange}
                        id="form2"
                        className="form-control"
                      />
                      <label className="form-label" htmlFor="form2">
                        Nhập tên công việc
                      </label>
                    </div>
                    <button type="submit" className="btn btn-info ms-2">
                      Thêm
                    </button>
                  </form>
                  {/* Tabs navs */}
                  <Navbar />
                  {/* Tabs navs */}
                  {/* Tabs content */}
                  {jobLocal.map((job) => (
                    <Content key={job.id} job={job} handleChangeStatus={handleChangeStatus} handleDelete={handleDelete} />
                  ))}
                  {/* Tabs content */}
                  {/* Xóa */}
                  {showDelete && (
                    <DeleteContent
                      jobDelete={jobToDelete}
                      deleteJob={deleteJob}
                      cancelDelete={cancelDelete}
                    />
                  )}
                  {/* Xóa */}
                  <WarnContent />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
