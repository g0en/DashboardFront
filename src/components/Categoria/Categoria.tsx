import { useEffect, useState } from "react";
import { Box, Typography, Button, Container, IconButton, Tooltip, List, ListItem, ListItemText } from "@mui/material";
import { Add, AddCircle, Visibility } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setCategoria } from "../../redux/slices/categoria";
import TableComponent from "../Table/Table";
import SearchBar from "../common/SearchBar";
import CategoriaService from "../../services/CategoriaService";
import { CommonRow } from "../../types/CommonRow";
import Column from "../../types/Column";
import ModalCategoria from "../Modal/ModalCategoria";
import ModalSubcategoria from "../Modal/ModalSubcategorias";
import { toggleModal } from "../../redux/slices/modal";
import { handleDelete, handleSearch } from "../../utils/utilities";
import ICategoria from "../../types/Categoria";

const Categoria = () => {
  const url = import.meta.env.VITE_API_URL;
  const dispatch = useAppDispatch();
  const categoriaService = new CategoriaService();
  const globalCategorias = useAppSelector((state) => state.categoria.categoria);

  const [filteredData, setFilteredData] = useState<CommonRow[]>([]);
  const [showSubcategoriaModal, setShowSubcategoriaModal] = useState<boolean>(false);
  const [categoriaPadre, setCategoriaPadre] = useState<ICategoria | null>(null);

  const fetchCategorias = async () => {
    try {
      const categorias = await categoriaService.getAll(url + "categorias");
      dispatch(setCategoria(categorias));
      setFilteredData(categorias as CommonRow[]);
    } catch (error) {
      console.error("Error al obtener las categorias:", error);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, [dispatch, categoriaPadre]);

  const onSearch = (query: string) => {
    handleSearch(query, globalCategorias, "denominacion", setFilteredData);
  };

  const handleEdit = (index: number) => {
    console.log("Editar categoría en el índice", index);
  };

  const handleAddCategoria = () => {
    dispatch(toggleModal({ modalName: "modal" }));
  };

  const onDelete = async (index: number) => {
    handleDelete(
      index,
      categoriaService,
      filteredData,
      fetchCategorias,
      "¿Estás seguro de eliminar esta categoría?",
      "Categoría eliminada correctamente.",
      "Hubo un problema al eliminar la categoría.",
      url + "categorias"
    );
  };

  const handleOpenSubcategoriaModal = (categoria: ICategoria) => {
    setCategoriaPadre(categoria);
    setShowSubcategoriaModal(true);
  };

  const handleCloseSubcategoriaModal = () => {
    setShowSubcategoriaModal(false);
    setCategoriaPadre(null);
  };

  const columns: Column[] = [
    { id: "denominacion", label: "Nombre", renderCell: (rowData) => <>{rowData.denominacion}</> },
    {
      id: "subCategorias",
      label: "Subcategorías",
      renderCell: (rowData) => (
        <>
          {rowData.subCategorias.length > 0 ? (
            <List>
              {rowData.subCategorias.map((subcategoria: ICategoria, index: number) => (
                <ListItem key={index}>
                  <ListItemText primary={subcategoria.denominacion} />
                </ListItem>
              ))}
            </List>
          ) : (
            "-"
          )}
        </>
      ),
    },
    {
      id: "agregarSubcategoria",
      label: "Agregar Subcategoría",
      renderCell: (rowData) => (
        <Button
          onClick={() => handleOpenSubcategoriaModal(rowData as ICategoria)}
          variant="outlined"
          color="primary"
          startIcon={<Add />}
        >
          Agregar
        </Button>
      ),
    },
    {
      id: "articulos",
      label: "Artículos",
      renderCell: () => (
        <Box>
          <Tooltip title="Ver Artículos">
            <IconButton aria-label="Ver Artículos">
              <Visibility />
            </IconButton>
          </Tooltip>
          <Tooltip title="Agregar artículo">
            <IconButton aria-label="Agregar artículo">
              <AddCircle />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Box component="main" sx={{ flexGrow: 1, my: 2 }}>
      <Container>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 1 }}>
          <Typography variant="h5" gutterBottom>
            Categorías
          </Typography>
          <Button
            onClick={handleAddCategoria}
            sx={{ bgcolor: "#fb6376", "&:hover": { bgcolor: "#d73754" } }}
            variant="contained"
            startIcon={<Add />}
          >
            Categoría
          </Button>
        </Box>
        <Box sx={{ mt: 2 }}>
          <SearchBar onSearch={onSearch} />
        </Box>
        <TableComponent data={filteredData} columns={columns} onEdit={handleEdit} onDelete={onDelete} />
        <ModalCategoria getCategorias={fetchCategorias} />
        {showSubcategoriaModal && categoriaPadre && (
          <ModalSubcategoria categoriaPadre={categoriaPadre} onClose={handleCloseSubcategoriaModal} />
        )}
      </Container>
    </Box>
  );
};

export default Categoria;
