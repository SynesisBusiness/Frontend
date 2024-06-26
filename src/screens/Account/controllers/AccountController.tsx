import Client, {
  ClientResponseError,
  RecordAuthResponse,
  RecordModel,
} from "pocketbase";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";

interface RegisterProps {
  name: string;
  email: string;
  password: string;
}

interface LoginProps {
  email: string;
  password: string;
}

// account controllers
export const handleLogin = async (
  data: LoginProps,
  navigate: NavigateFunction,
  loading: React.ComponentState,
  setLoading: React.ComponentState,
  onLogin: (
    email: string,
    password: string,
    loading: React.ComponentState,
    setLoading: React.ComponentState
  ) => Promise<RecordAuthResponse<RecordModel> | null | undefined>
) => {
  try {
    const response = await onLogin!(
      data.email,
      data.password,
      loading,
      setLoading
    );

    if (!response) {
      toast("Incorrect email and/or password", {
        autoClose: 2500,
        type: "error",
      });
    } else {
      navigate("/forms/business");
    }
  } catch (error) {
    console.error("Failed to login", error);
  }
};

export const handleRegister = async (
  backendClient: Client,
  data: RegisterProps,
  loading: React.ComponentState,
  setLoading: React.ComponentState,
  navigate: NavigateFunction,
  onLogin: (
    email: string,
    password: string,
    loading: React.ComponentState,
    setLoading: React.ComponentState
  ) => Promise<RecordAuthResponse<RecordModel> | null | undefined>
) => {
  if (data.password.length < 8) {
    return toast("The password must contain at least 8 characters", {
      autoClose: 2500,
      type: "warning",
    });
  }

  try {
    setLoading(true);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("passwordConfirm", data.password);

    await backendClient!
      .collection("users")
      .create(formData)
      .then(async () => {
        const response = await onLogin!(
          data.email,
          data.password,
          loading,
          setLoading
        );

        if (!response) {
          toast("Incorrect email and/or password", {
            autoClose: 2500,
            type: "error",
          });
        } else {
          toast("Account created successfully");
          navigate("/forms/business");
        }
      })
      .catch((e: ClientResponseError) => {
        try {
          if (
            e.response.data.email &&
            e.response.data.email.message ===
              "The email is invalid or already in use."
          ) {
            toast("The email is invalid or already in use", {
              autoClose: 2500,
              type: "error",
            });
          }
        } catch (e) {
          console.log(e);
          toast("Internal error when creating account", {
            autoClose: 2500,
            type: "error",
          });
        }
      });
  } catch (error) {
    console.error(error);
  }

  setLoading(false);
};
