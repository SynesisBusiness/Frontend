/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { BallTriangle } from "react-loading-icons";
import { jwtDecode } from "jwt-decode";
import { RocketLaunch } from "phosphor-react";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import * as styles from "./styles/GrowthPlanStyles";

import logo from "../../assets/logos/logo.svg";

import { useContextApi } from "../../context/Api";
import { getPromptGrowth } from "../../utils/Prompts/GrowthDiagnosis/PromptGrowth";

interface Diagnosis {
  id: string;
  user: string;
  company: string;
  questionary_data: string;
  instruction: string;
  report: string;
}

interface Company {
  id: string;
  name: string;
  path: string;
}

interface QuestionaryCostumer {
  id: string;
  responses: string;
  company: string;
}

const GrowthPlan: React.FC = () => {
  const navigate = useNavigate();
  const { backendClient } = useContextApi();

  // diagnosis
  const [loading, setLoading] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [diagnosis, setDiagnosis] = useState<Diagnosis>();
  const [errorGenerated, setErrorGenerated] = useState<boolean>(false);

  const getCompany = async () => {
    try {
      const decoded: { id: string } = jwtDecode(
        localStorage.getItem("tokenJWT") as string
      );

      const response = await backendClient
        ?.collection("users")
        .getOne(decoded.id, { expand: "companies(user)", requestKey: null });

      if (response?.expand) {
        return response?.expand["companies(user)"][0];
      }
    } catch (e) {
      console.log(`error get company: ${e}`);
    }

    return undefined;
  };

  const getCostumersReports = async () => {
    try {
      const companyData: Company = await getCompany();

      if (companyData) {
        const response = await backendClient
          ?.collection("form_responses_clients")
          .getFullList({
            filter: `company="${companyData?.id}"`,
            requestKey: null,
          });

        return response;
      }
    } catch (e) {
      console.log(`error get costumers reports: ${e}`);
    }

    return undefined;
  };

  const generateDiagnosis = async () => {
    setLoading(true);

    try {
      const decoded: { id: string } = jwtDecode(
        localStorage.getItem("tokenJWT") as string
      );

      const response = await backendClient
        ?.collection("growth_plan")
        .getFullList({
          filter: `user="${decoded.id}"`,
          requestKey: null,
        });

      if (!response || response.length === 0) {
        navigate("/diagnosis");
      }

      const diagnosisData: Diagnosis | undefined =
        response && (response[0] as unknown as Diagnosis);

      const reportsCostumers = await getCostumersReports();

      if (diagnosisData && reportsCostumers) {
        setDiagnosis(diagnosisData);

        if (!diagnosisData.report) {
          setIsGenerating(true);

          const response = await backendClient
            ?.collection("form_responses_business_owner")
            .getFullList({
              filter: `user="${decoded.id}"`,
              requestKey: null,
            });

          if (response) {
            const formDataOwner = response[0];

            const prompt = getPromptGrowth(
              formDataOwner.responses_form1,
              formDataOwner.responses_form2,
              reportsCostumers as unknown as QuestionaryCostumer[]
            );

            console.log(diagnosisData.id);
            console.log(prompt);
            axios.post(`https://synesisbusiness.com/api/ask/growth_plan`, {
              prompt: prompt,
              growthPlanId: diagnosisData.id,
              userId: decoded.id,
            });
          }
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

  useEffect(() => {
    if (backendClient) {
      generateDiagnosis();
    }
  }, [backendClient]);

  useEffect(() => {
    let intervalId: number | null;

    const checkDiagnosis = async () => {
      try {
        const response = await backendClient
          ?.collection("growth_plan")
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
                ? "The Growth diagnostics is being generated"
                : "Loading the Growth diagnostics..."}
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
                <h3>Error when generating your growth diagnostics</h3>

                <p>
                  An error occurred while processing your diagnostics, please
                  try again
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
                  , your growth diagnostics is being generated
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
        </styles.Main>
      )}

      <ToastContainer />
    </styles.Container>
  );
};

export default GrowthPlan;
