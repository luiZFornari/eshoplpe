import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  getCategoriaPorCodigoDB,
  addCategoriaDB,
  updateCategoriaDB,
} from "@/componentes/bd/usecases/categoriaUseCases";

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
      codigo: formData.get("codigo"),
      nome: formData.get("nome"),
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
      <form action={salvarCategoria}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-6">
              <div>
                <label>Código</label>
                <input
                  type="number"
                  defaultValue={categoria.codigo}
                  name="codigo"
                  readOnly
                />
              </div>
              <div>
                <label>Nome</label>
                <input
                  type="text"
                  defaultValue={categoria.nome}
                  name="nome"
                  required
                />
              </div>

              <div className="form-group text-center mt-3">
                <button type="submit" className="btn btn-success">
                  Salvar <i className="bi bi-save"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default FormularioPage;
