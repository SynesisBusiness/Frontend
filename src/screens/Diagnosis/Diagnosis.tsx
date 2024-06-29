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
import axios from "axios";
import { useNavigate } from "react-router-dom";

import * as styles from "./styles/DiagnosisStyles";

import logo from "../../assets/logos/logo.svg";

import { useContextApi } from "../../context/Api";
import { getPromptDiagnosis } from "../../utils/Prompts/Diagnosis/PromptDiagnosis";

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

interface Diagnosis {
  id: string;
  user: string;
  company: string;
  questionary_data: string;
  instruction: string;
  report: string;
}

const Diagnosis: React.FC = () => {
  const navigate = useNavigate();
  const { backendClient } = useContextApi();

  // diagnosis
  const [loading, setLoading] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [diagnosis, setDiagnosis] = useState<Diagnosis>();
  const [errorGenerated, setErrorGenerated] = useState<boolean>(false);

  // growth plan
  const [loadingGrowthDiagnosis, setLoadingGrowthDiagnosis] =
    useState<boolean>(false);
  const [hasGrowthDiagnosis, setHasGrowthDiagnosis] = useState<boolean>(false);

  // steps
  const [stepsBlocked, setStepsBlocked] = useState({
    one: false,
    two: true,
    three: true,
  });
  const [stepsFinished, setStepsFinished] = useState({
    one: false,
    two: false,
    three: false,
  });

  // company
  const [loadingCompany, setLoadingCompany] = useState<boolean>(true);
  const [company, setCompany] = useState<Company>();

  // reports clients
  const [loadingReports, setLoadingReports] = useState<boolean>(true);
  const [reportsClients, setReportsClients] = useState<ReportClient[]>([]);

  // excel file
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

  const generateDiagnosis = async () => {
    setLoading(true);

    try {
      const decoded: { id: string } = jwtDecode(
        localStorage.getItem("tokenJWT") as string
      );

      const response = await backendClient
        ?.collection("diagnosis")
        .getFullList({
          filter: `user="${decoded.id}"`,
          requestKey: null,
        });

      if (!response || response.length === 0) {
        navigate("/forms/business/1");
      }

      const diagnosisData: Diagnosis | undefined =
        response && (response[0] as unknown as Diagnosis);

      if (diagnosisData) {
        setDiagnosis(diagnosisData);

        if (!diagnosisData.report) {
          setIsGenerating(true);

          const prompt = getPromptDiagnosis(diagnosisData.questionary_data);

          axios.post(`https://synesisbusiness.com/api/ask`, {
            prompt: prompt,
            diagnosisId: diagnosisData.id,
            userId: decoded.id,
          });
        } else {
          setIsGenerating(false);
        }
      }
    } catch (e) {
      console.log(`error generate diagnosis: ${e}`);
      setErrorGenerated(true);
    }

    setLoading(false);
  };

  const generateGrowthDiagnosis = async () => {
    setLoadingGrowthDiagnosis(true);

    try {
      const decoded: { id: string } = jwtDecode(
        localStorage.getItem("tokenJWT") as string
      );

      await backendClient?.collection("growth_plan").create({
        user: decoded.id,
        company: company?.id,
      });

      navigate("/diagnosis/growth");
    } catch (e) {
      console.log(`error generate diagnosis: ${e}`);
      setErrorGenerated(true);
    }

    setLoadingGrowthDiagnosis(false);
  };

  const getGrowthDiagnosis = async () => {
    try {
      const decoded: { id: string } = jwtDecode(
        localStorage.getItem("tokenJWT") as string
      );

      const responses = await backendClient
        ?.collection("growth_plan")
        .getFullList({
          filter: `user="${decoded.id}"`,
          requestKey: null,
        });

      if (responses && responses.length >= 1) {
        setHasGrowthDiagnosis(true);
      } else {
        setHasGrowthDiagnosis(false);
      }
    } catch (e) {
      console.log(`error get growth diagnosis: ${e}`);
    }
  };

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
        setStepsFinished((prev) => ({ ...prev, one: true }));
      }
    } catch (e) {
      console.log(`error get costumers reports: ${e}`);
    }

    setLoadingReports(false);
  };

  const getFileExcel = async () => {
    const decoded: { id: string } = jwtDecode(
      localStorage.getItem("tokenJWT") as string
    );

    try {
      const responses = await backendClient
        ?.collection("analytics_excel")
        .getFullList({
          filter: `user="${decoded.id}"`,
          requestKey: null,
        });

      if (responses && responses.length >= 1) {
        setStepsFinished((prev) => ({ ...prev, two: true }));
      }
    } catch (e) {
      console.log(`error get file excel: ${e}`);
    }
  };

  const handleExcelFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setExcelFile(e.target.files[0]);
      setUploadSuccess(false);
    }
  };

  const handleUpload = async () => {
    if (!excelFile) return;

    setUploading(true);

    const decoded: { id: string } = jwtDecode(
      localStorage.getItem("tokenJWT") as string
    );

    const formData = new FormData();
    formData.append("file", excelFile);

    if (!stepsFinished.two) {
      formData.append("user", decoded.id);
    }

    try {
      if (!stepsFinished.two) {
        await backendClient?.collection("analytics_excel").create(formData);
      } else {
        const responses = await backendClient
          ?.collection("analytics_excel")
          .getFullList({
            filter: `user="${decoded.id}"`,
            requestKey: null,
          });

        if (responses) {
          const analyticsData = responses[0];

          await backendClient
            ?.collection("analytics_excel")
            .update(analyticsData?.id as string, formData);
        }
      }

      setUploadSuccess(true);
      toast("Upload successful");
      setStepsFinished((prev) => ({ ...prev, two: true }));
    } catch (error) {
      console.error("Error uploading file:", error);
      toast("Error uploading file", {
        type: "error",
      });
    } finally {
      setUploading(false);
    }
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
        setStepsFinished((prev) => ({ ...prev, three: true }));
      }
    } catch (e) {
      console.log(`error get form owner 2: ${e}`);
    }
  };

  useEffect(() => {
    if (company) {
      getCostumersReports();
      getFileExcel();
      getFormOnwer2();
    }
  }, [company]);

  useEffect(() => {
    if (backendClient) {
      generateDiagnosis();
      getCompany();
      getGrowthDiagnosis();
    }
  }, [backendClient]);

  useEffect(() => {
    console.log("Steps Finished Updated:", stepsFinished);
    setStepsBlocked((prev) => ({
      ...prev,
      two: stepsFinished.one ? false : prev.two,
      three: stepsFinished.two ? false : prev.three,
    }));
  }, [stepsFinished]);

  useEffect(() => {
    let intervalId: number | null;

    const checkDiagnosis = async () => {
      try {
        const response = await backendClient
          ?.collection("diagnosis")
          .getOne(diagnosis?.id as string, { requestKey: null });

        const updatedDiagnosis: Diagnosis | undefined = response as
          | Diagnosis
          | undefined;

        if (updatedDiagnosis?.report) {
          setDiagnosis(updatedDiagnosis);
          setIsGenerating(false);
          clearInterval(intervalId as number);
        }
      } catch (error) {
        console.error("Error updating diagnosis:", error);
      }
    };

    if (isGenerating) {
      intervalId = setInterval(checkDiagnosis, 3000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isGenerating]);

  return (
    <styles.Container>
      {loading && (
        <styles.LoadingScreen>
          <styles.Loading>
            <h2>
              {isGenerating
                ? "The Growth objective assessment is being generated"
                : "Loading the dignosis..."}
            </h2>

            <p>
              {isGenerating
                ? "It will be ready in a few minutes, please wait on this screen..."
                : "Please wait a second"}
            </p>

            <BallTriangle strokeWidth={200} stroke="#555" />
          </styles.Loading>
        </styles.LoadingScreen>
      )}

      {!loading && (
        <styles.Main>
          <styles.Logo>
            <img src={logo} alt="Logo synesis" />
          </styles.Logo>

          <styles.ReportContainer
            className={
              !isGenerating && !errorGenerated && diagnosis?.report
                ? "separated"
                : ""
            }
          >
            {errorGenerated && (
              <styles.ReportError>
                <h3>Error when generating your growth objective assessment</h3>

                <p>
                  An error occurred while processing your diagnosis, please try
                  again
                </p>

                <styles.Button>
                  <button>
                    Try again{" "}
                    <RocketLaunch size={20} className="icon__rocket" />
                  </button>
                </styles.Button>
              </styles.ReportError>
            )}

            {!errorGenerated && !diagnosis?.report && (
              <styles.NoTextReport>
                <h3>
                  Hello{" "}
                  {
                    JSON.parse(
                      localStorage.getItem("pocketbase_auth") as string
                    ).model.name
                  }
                  , your growth objective assessment is being generated
                </h3>

                <p>
                  This may take a few minutes, don't worry, we'll let you know
                  by email when it's ready.
                </p>
              </styles.NoTextReport>
            )}

            {!errorGenerated && diagnosis?.report && (
              <styles.TextReport>
                <div
                  className="text"
                  dangerouslySetInnerHTML={{ __html: diagnosis.report }}
                />
              </styles.TextReport>
            )}
          </styles.ReportContainer>

          {!errorGenerated && diagnosis?.report && !hasGrowthDiagnosis && (
            <styles.NextSteps>
              <styles.NextStepsTitle>
                <h2>
                  Stay tuned for next steps{" "}
                  {
                    JSON.parse(
                      localStorage.getItem("pocketbase_auth") as string
                    ).model.name
                  }
                </h2>

                <p className="info">
                  Complete the 4 steps below to achieve your growth diagnostics
                </p>
              </styles.NextStepsTitle>

              <styles.NextStepsBoxes>
                <styles.Step>
                  <h3 style={stepsFinished.one ? { color: "#008000" } : {}}>
                    {stepsBlocked.one && !stepsFinished.one && (
                      <LockSimple
                        size={20}
                        color="#777"
                        className="icon__lock"
                      />
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
                      1. Send the questionnaire below for your customers to
                      answer (at least 3)
                    </span>
                  </h3>

                  <styles.StepBody>
                    <div className="form__copy">
                      <CopyToClipboard
                        text={`https://synesisbusiness.com/forms/costumers/${
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
                      <LockSimple
                        size={20}
                        color="#777"
                        className="icon__lock"
                      />
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
                      2. Upload analytics with your social media metrics
                    </span>
                  </h3>

                  {(!stepsBlocked.two || stepsFinished.two) && (
                    <styles.StepBody>
                      <styles.UploadFile>
                        <input type="file" onChange={handleExcelFileChange} />

                        <button
                          onClick={() => {
                            if (excelFile) {
                              handleUpload();
                            } else {
                              toast("Attach the analytics first", {
                                type: "warning",
                              });
                            }
                          }}
                          disabled={uploading}
                          style={
                            excelFile
                              ? {}
                              : { border: "2px solid #aaa", color: "#aaa" }
                          }
                        >
                          {uploading
                            ? "Uploading..."
                            : uploadSuccess
                            ? "Upload Successful"
                            : "Upload File"}
                        </button>
                      </styles.UploadFile>
                    </styles.StepBody>
                  )}
                </styles.Step>

                <styles.Step>
                  <h3
                    className={stepsBlocked.three ? "blocked" : ""}
                    style={stepsFinished.three ? { color: "#008000" } : {}}
                  >
                    {stepsBlocked.three && !stepsFinished.three && (
                      <LockSimple
                        size={20}
                        color="#777"
                        className="icon__lock"
                      />
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
                    <span>3. Answer the questionnaire 2</span>
                  </h3>

                  {!stepsBlocked.three && (
                    <styles.StepBody>
                      <button
                        onClick={() => {
                          if (stepsFinished.three === false) {
                            navigate("/forms/business/2");
                          } else {
                            toast("You have already answered");
                          }
                        }}
                      >
                        {stepsFinished.three
                          ? "Answered already"
                          : "Answer questionnaire"}
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
                      stepsFinished.three
                    ) {
                      generateGrowthDiagnosis();
                    } else {
                      toast("Please complete the 4 steps", {
                        type: "warning",
                      });
                    }
                  }}
                  className={
                    stepsFinished.one &&
                    stepsFinished.two &&
                    stepsFinished.three
                      ? ""
                      : "disabled"
                  }
                >
                  {loadingGrowthDiagnosis ? (
                    "Wait..."
                  ) : (
                    <>
                      Generate growth diagnostics{" "}
                      <RocketLaunch size={20} className="icon__rocket" />
                    </>
                  )}
                </button>
              </styles.GrowthButton>
            </styles.NextSteps>
          )}

          {hasGrowthDiagnosis && (
            <styles.HasDiagnosis>
              <h2>
                Hello{" "}
                {
                  JSON.parse(localStorage.getItem("pocketbase_auth") as string)
                    .model.name
                }
              </h2>

              <p>
                you have already generated your growth diagnosis, view it by
                clicking the button below
              </p>

              <styles.Button>
                <button onClick={() => navigate("/diagnosis/growth")}>
                  See growth diagnosis{" "}
                  <RocketLaunch size={20} className="icon__rocket" />
                </button>
              </styles.Button>
            </styles.HasDiagnosis>
          )}
        </styles.Main>
      )}

      <ToastContainer />
    </styles.Container>
  );
};

export default Diagnosis;
