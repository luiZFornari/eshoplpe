import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  getCategoriaPorCodigoDB,
  addCategoriaDB,
  updateCategoriaDB,
} from "@/componentes/bd/usecases/categoriaUseCases";
import FormularioCategoria from "@/componentes/comuns/FormularioCategoria";

const FormularioPage = async ({ params }) => {
  let categoria = null;
  if (params.codigo == 0) {
    categoria = { codigo: 0, nome: "" };
  } else {
    try {
      categoria = await getCategoriaPorCodigoDB(params.codigo);
    } catch (err) {
      return notFound();
    }
  }

  const salvarCategoria = async (formData) => {
    "use server";
    const objeto = {
      codigo: formData.codigo,
      nome: formData.nome,
    };
    try {
      if (objeto.codigo == 0) {
        await addCategoriaDB(objeto);
      } else {
        await updateCategoriaDB(objeto);
      }
    } catch (err) {
      throw new Error("Erro: " + err);
    }
    revalidatePath("/privado/categoria/");
    redirect("/privado/categoria/");
  };

  return (
    <div>
      <div style={{ textAlign: "center" }}>
        <h2>Categoria</h2>
      </div>
      <FormularioCategoria categoria={categoria} onSave={salvarCategoria} />
    </div>
  );
};

export default FormularioPage;
