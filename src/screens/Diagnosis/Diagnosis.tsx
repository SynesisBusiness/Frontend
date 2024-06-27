/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { BallTriangle } from "react-loading-icons";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { jwtDecode } from "jwt-decode";
import {
  CheckCircle,
  CircleNotch,
  CopySimple,
  LockSimple,
  LockSimpleOpen,
  RocketLaunch,
  UsersThree,
} from "phosphor-react";
import { ToastContainer, toast } from "react-toastify";

import * as styles from "./styles/DiagnosisStyles";

import { useContextApi } from "../../context/Api";
import { useNavigate } from "react-router-dom";

interface Company {
  id: string;
  name: string;
  path: string;
}

interface ReportClient {
  id: string;
  responses: string;
  company: string;
}

const Diagnosis: React.FC = () => {
  const navigate = useNavigate();
  const { backendClient } = useContextApi();

  const [loading] = useState<boolean>(true);

  // steps
  const [stepsBlocked, setStepsBlocked] = useState({
    one: false,
    two: true,
    three: true,
    four: true,
  });
  const [stepsFinished, setStepsFinished] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
  });

  // company
  const [loadingCompany, setLoadingCompany] = useState<boolean>(true);
  const [company, setCompany] = useState<Company>();

  // reports clients
  const [loadingReports, setLoadingReports] = useState<boolean>(true);
  const [reportsClients, setReportsClients] = useState<ReportClient[]>([]);

  // social media
  const [instagramChecked, setInstagramChecked] = useState(false);
  const [linkedinChecked, setLinkedinChecked] = useState(false);
  const [dataMedia, setDataMedia] = useState({
    instagram: "",
    linkedin: "",
  });

  // website
  const [dataWebsite, setDataWebsite] = useState("");

  const getCompany = async () => {
    setLoadingCompany(true);

    try {
      const decoded: { id: string } = jwtDecode(
        localStorage.getItem("tokenJWT") as string
      );

      const response = await backendClient
        ?.collection("users")
        .getOne(decoded.id, { expand: "companies(user)", requestKey: null });

      if (response?.expand) {
        setCompany(response?.expand["companies(user)"][0]);
      }
    } catch (e) {
      console.log(`error get company: ${e}`);
    }

    setLoadingCompany(false);
  };

  const getCostumersReports = async () => {
    setLoadingReports(true);

    try {
      const response = await backendClient
        ?.collection("form_responses_clients")
        .getFullList({
          filter: `company="${company?.id}"`,
          requestKey: null,
        });

      setReportsClients(response as unknown as ReportClient[]);

      if (response && response?.length >= 3) {
        setStepsFinished({ ...stepsFinished, one: true });
      }
    } catch (e) {
      console.log(`error get costumers reports: ${e}`);
    }

    setLoadingReports(false);
  };

  const getFormOnwer2 = async () => {
    try {
      const decoded: { id: string } = jwtDecode(
        localStorage.getItem("tokenJWT") as string
      );

      const response = await backendClient
        ?.collection("form_responses_business_owner")
        .getFullList({
          filter: `user="${decoded.id}"`,
          requestKey: null,
        });

      if (response && response[0]?.responses_form2) {
        setStepsFinished({ ...stepsFinished, four: true });
      }
    } catch (e) {
      console.log(`error get form owner 2: ${e}`);
    }
  };

  useEffect(() => {
    if (company) {
      getCostumersReports();
      getFormOnwer2();
    }
  }, [company]);

  useEffect(() => {
    if (backendClient) {
      getCompany();
    }
  }, [backendClient]);

  useEffect(() => {
    const { one, two, three } = stepsFinished;
    if (one && stepsBlocked.two) {
      setStepsBlocked((prev) => ({ ...prev, two: false }));
    }
    if (two && stepsBlocked.three) {
      setStepsBlocked((prev) => ({ ...prev, three: false }));
    }
    if (three && stepsBlocked.four) {
      setStepsBlocked((prev) => ({ ...prev, four: false }));
    }
  }, [stepsFinished]);

  return (
    <styles.Container>
      {loading && (
        <styles.LoadingScreen>
          <styles.Loading>
            <h2>The Diagnosis is being generated</h2>

            <p>
              It will be ready in a few minutes, please wait on this screen...
            </p>

            <BallTriangle strokeWidth={200} stroke="#555" />
          </styles.Loading>
        </styles.LoadingScreen>
      )}

      {!loading && (
        <styles.Main>
          <styles.ReportContainer></styles.ReportContainer>

          <styles.NextSteps>
            <styles.NextStepsTitle>
              <h2>
                Stay tuned for next steps{" "}
                {
                  JSON.parse(localStorage.getItem("pocketbase_auth") as string)
                    .model.name
                }
              </h2>

              <p className="info">
                Complete the 4 steps below to achieve your growth diagnosis
              </p>
            </styles.NextStepsTitle>

            <styles.NextStepsBoxes>
              <styles.Step>
                <h3 style={stepsFinished.one ? { color: "#008000" } : {}}>
                  {stepsBlocked.one && !stepsFinished.one && (
                    <LockSimple size={20} color="#777" className="icon__lock" />
                  )}
                  {!stepsBlocked.one && !stepsFinished.one && (
                    <LockSimpleOpen
                      size={20}
                      color="#000"
                      className="icon__lock"
                    />
                  )}
                  {stepsFinished.one && (
                    <CheckCircle
                      color="#008000"
                      size={20}
                      className="icon__check"
                    />
                  )}
                  <span>
                    1. Send the questionnaire below for your customers to answer
                    (at least 3)
                  </span>
                </h3>

                <styles.StepBody>
                  <div className="form__copy">
                    <CopyToClipboard
                      text={`https://synesisbuniness.com/forms/costumers/${
                        !loadingCompany && company?.name
                      }`}
                      onCopy={() => {
                        if (loadingCompany) {
                          toast("Error! Please try copy again");
                        } else {
                          toast("Text copied successfully");
                        }
                      }}
                    >
                      <p>
                        Costumer questionnaire{" "}
                        <CopySimple
                          size={20}
                          className="icon__copy"
                          color="#78d2e5"
                        />
                      </p>
                    </CopyToClipboard>
                  </div>

                  <div className="form__client__answers">
                    <h4>
                      You can track how many forms have already been answered
                    </h4>

                    {loadingReports && (
                      <div className="loading__reports">
                        <CircleNotch
                          size={25}
                          color="#333"
                          className="spinning"
                        />
                      </div>
                    )}

                    {!loadingReports && (
                      <p>
                        <UsersThree
                          color="#000"
                          size={22}
                          className="icon__users"
                        />
                        <span>{reportsClients.length}</span>/3 costumers
                        answered the questionnaire
                      </p>
                    )}
                  </div>
                </styles.StepBody>
              </styles.Step>

              <styles.Step>
                <h3
                  className={stepsBlocked.two ? "blocked" : ""}
                  style={stepsFinished.two ? { color: "#008000" } : {}}
                >
                  {stepsBlocked.two && !stepsFinished.two && (
                    <LockSimple size={20} color="#777" className="icon__lock" />
                  )}
                  {!stepsBlocked.two && !stepsFinished.two && (
                    <LockSimpleOpen
                      size={20}
                      color="#000"
                      className="icon__lock"
                    />
                  )}
                  {stepsFinished.two && (
                    <CheckCircle
                      color="#008000"
                      size={20}
                      className="icon__check"
                    />
                  )}
                  <span>
                    {" "}
                    2. Add your Instagram and Linkedin profile in the indicated
                    fields and complete the process in the video below
                  </span>
                </h3>

                {(!stepsBlocked.two || stepsFinished.two) && (
                  <styles.StepBody>
                    <label>
                      <input
                        type="checkbox"
                        checked={instagramChecked}
                        onChange={(e) => setInstagramChecked(e.target.checked)}
                        style={{ display: "none" }}
                      />
                      <styles.CustomCheckbox checked={instagramChecked}>
                        {instagramChecked && (
                          <CheckCircle size={20} color="#78d2e5" />
                        )}
                      </styles.CustomCheckbox>
                      Instagram
                    </label>

                    {instagramChecked && (
                      <input
                        type="text"
                        value={dataMedia.instagram}
                        onChange={(e) =>
                          setDataMedia({
                            ...dataMedia,
                            instagram: e.target.value,
                          })
                        }
                        placeholder="Enter your Instagram profile"
                      />
                    )}

                    <label>
                      <input
                        type="checkbox"
                        checked={linkedinChecked}
                        onChange={(e) => setLinkedinChecked(e.target.checked)}
                        style={{ display: "none" }}
                      />
                      <styles.CustomCheckbox checked={linkedinChecked}>
                        {linkedinChecked && (
                          <CheckCircle size={20} color="#78d2e5" />
                        )}
                      </styles.CustomCheckbox>
                      LinkedIn
                    </label>

                    {linkedinChecked && (
                      <input
                        type="text"
                        value={dataMedia.linkedin}
                        onChange={(e) =>
                          setDataMedia({
                            ...dataMedia,
                            linkedin: e.target.value,
                          })
                        }
                        placeholder="Enter your LinkedIn profile"
                      />
                    )}
                  </styles.StepBody>
                )}
              </styles.Step>

              <styles.Step>
                <h3
                  className={stepsBlocked.three ? "blocked" : ""}
                  style={stepsFinished.three ? { color: "#008000" } : {}}
                >
                  {stepsBlocked.three && !stepsFinished.three && (
                    <LockSimple size={20} color="#777" className="icon__lock" />
                  )}
                  {!stepsBlocked.three && !stepsFinished.three && (
                    <LockSimpleOpen
                      size={20}
                      color="#000"
                      className="icon__lock"
                    />
                  )}
                  {stepsFinished.three && (
                    <CheckCircle
                      color="#008000"
                      size={20}
                      className="icon__check"
                    />
                  )}
                  <span>3. Send your website link</span>
                </h3>

                {(!stepsBlocked.three || stepsFinished.three) && (
                  <styles.StepBody>
                    <input
                      type="text"
                      value={dataWebsite}
                      onChange={(e) => setDataWebsite(e.target.value)}
                      placeholder="Enter your website link..."
                    />
                  </styles.StepBody>
                )}
              </styles.Step>

              <styles.Step>
                <h3
                  className={stepsBlocked.four ? "blocked" : ""}
                  style={stepsFinished.four ? { color: "#008000" } : {}}
                >
                  {stepsBlocked.four && !stepsFinished.four && (
                    <LockSimple size={20} color="#777" className="icon__lock" />
                  )}
                  {!stepsBlocked.four && !stepsFinished.four && (
                    <LockSimpleOpen
                      size={20}
                      color="#000"
                      className="icon__lock"
                    />
                  )}
                  {stepsFinished.four && (
                    <CheckCircle
                      color="#008000"
                      size={20}
                      className="icon__check"
                    />
                  )}
                  <span>4. Answer the questionnaire 2</span>
                </h3>

                {(!stepsBlocked.four || stepsFinished.four) && (
                  <styles.StepBody>
                    <button onClick={() => navigate("/forms/business/2")}>
                      Answer questionnaire
                    </button>
                  </styles.StepBody>
                )}
              </styles.Step>
            </styles.NextStepsBoxes>

            <styles.GrowthButton>
              <button
                onClick={() => {
                  if (
                    stepsFinished.one &&
                    stepsFinished.two &&
                    stepsFinished.three &&
                    stepsFinished.four
                  ) {
                    // generate growth plan
                  } else {
                    toast("Please complete the 4 steps", {
                      type: "warning",
                    });
                  }
                }}
                className={
                  stepsFinished.one &&
                  stepsFinished.two &&
                  stepsFinished.three &&
                  stepsFinished.four
                    ? ""
                    : "disabled"
                }
              >
                Generate growth diagnosis{" "}
                <RocketLaunch size={20} className="icon__rocket" />
              </button>
            </styles.GrowthButton>
          </styles.NextSteps>
        </styles.Main>
      )}

      <ToastContainer />
    </styles.Container>
  );
};

export default Diagnosis;
