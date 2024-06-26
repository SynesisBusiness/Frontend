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
      toast("Email e/ou senha incorretos", {
        autoClose: 2500,
        type: "error",
      });
    } else {
      console.log("navigate login success");
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
    return toast("A senha deve conter no mínimo 8 caracteres", {
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
          toast("Email e/ou senha incorretos", {
            autoClose: 2500,
            type: "error",
          });
        } else {
          // if (redirectForm) {
          //   navigate("/diagnostico/form");
          // } else {
          //   navigate("/perfil");
          // }
          console.log("/navigate login success");
        }
      })
      .catch((e: ClientResponseError) => {
        try {
          if (
            e.response.data.email &&
            e.response.data.email.message ===
              "The email is invalid or already in use."
          ) {
            toast("Este email já está em uso!", {
              autoClose: 2500,
              type: "error",
            });
          }
        } catch (e) {
          console.log(e);
          toast("Erro interno ao criar conta", {
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
