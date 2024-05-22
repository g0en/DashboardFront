import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Container,
  Tooltip,
  IconButton,
  Paper,
} from "@mui/material";
import { Add, Visibility, AddCircle } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { setEmpresa } from "../../redux/slices/empresa";
import TableComponent from "../Table/Table";
import SearchBar from "../common/SearchBar";
import EmpresaService from "../../services/EmpresaService";
import Column from "../../types/Column";
import Empresa from "../../types/Empresa";
import ModalEmpresa from "../Modal/ModalEmpresa";
import { handleDelete, handleSearch } from "../../utils/utilities";
import { Link } from "react-router-dom";
import { toggleModal } from "../../redux/slices/modal";

// Actualizamos el tipo Column para incluir la propiedad renderHeader
interface ExtendedColumn extends Column {
  renderHeader?: () => JSX.Element;
}

const EmpresaComponent = () => {
  const url = import.meta.env.VITE_API_URL;
  const dispatch = useAppDispatch();
  const empresaService = new EmpresaService();
  const globalEmpresas = useAppSelector((state) => state.empresa.empresa);

  const [filteredData, setFilteredData] = useState<Empresa[]>([]);

  const fetchEmpresas = async () => {
    try {
      const empresas = await empresaService.getAll(url + "empresas");
      dispatch(setEmpresa(empresas));
      setFilteredData(empresas);
    } catch (error) {
      console.error("Error al obtener las empresas:", error);
    }
  };

  useEffect(() => {
    fetchEmpresas();
  }, []);

  const onSearch = (query: string) => {
    handleSearch(query, globalEmpresas, "nombre", setFilteredData);
  };

  const onDelete = async (index: number) => {
    handleDelete(
      index,
      empresaService,
      filteredData,
      fetchEmpresas,
      "¿Estás seguro de eliminar esta empresa?",
      "Empresa eliminada correctamente.",
      "Hubo un problema al eliminar la empresa.",
      url + "empresas"
    );
  };

  const handleEdit = (index: number) => {
    console.log("Editar empresa en el índice", index);
  };

  const handleAddEmpresa = () => {
    dispatch(toggleModal({ modalName: "modal" }));
  };

  const columns: ExtendedColumn[] = [
    {
      id: "nombre",
      label: "Nombre de la Empresa",
      renderHeader: () => (
        <Box sx={{ bgcolor: "#FFDDD7" }}>
          <Typography variant="subtitle1">Nombre de la Empresa</Typography>
        </Box>
      ),
      renderCell: (empresa) => <>{empresa.nombre}</>,
    },
    {
      id: "razonSocial",
      label: "Razón Social",
      renderCell: (empresa) => <>{empresa.razonSocial}</>,
      renderHeader: () => (
        <Box sx={{ bgcolor: "#FFDDD7" }}>
          <Typography variant="subtitle1">Razón Social</Typography>
        </Box>
      ),
    },
    {
      id: "cuil",
      label: "CUIL",
      renderCell: (empresa) => <>{empresa.cuil}</>,
      renderHeader: () => (
        <Box sx={{ bgcolor: "#FFDDD7" }}>
          <Typography variant="subtitle1">CUIL</Typography>
        </Box>
      ),
    },
    {
      id: "acciones",
      label: "Acciones",
      renderCell: (empresa) => (
        <>
          <Tooltip title="Ver Sucursales">
            <IconButton
              component={Link}
              to={`/sucursales/${empresa.id}`}
              aria-label="Ver Sucursales"
            >
              <Visibility />
            </IconButton>
          </Tooltip>
          <Tooltip title="Agregar Sucursal">
            <IconButton
              component={Link}
              to={`/agregar-sucursal/${empresa.id}`}
              aria-label="Agregar Sucursal"
            >
              <AddCircle />
            </IconButton>
          </Tooltip>
        </>
      ),
      renderHeader: () => (
        <Box sx={{ bgcolor: "#FFDDD7" }}>
          <Typography variant="subtitle1">Acciones</Typography>
        </Box>
      ),
    },
  ];


  return (
      <Box component="main" sx={{ flexGrow: 1, my: 2 }}>
        <Container>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              my: 1,
            }}
          >
            <Typography variant="h4" gutterBottom color={"#581845"}>
              Empresas
            </Typography>
            <Button
              onClick={handleAddEmpresa}
              sx={{
                bgcolor: "#581845",
                "&:hover": {
                  bgcolor: "#900C3F",
                },
              }}
              variant="contained"
              startIcon={<Add />}
            >
              Añadir Empresa
            </Button>
          </Box>
          <Box sx={{ bgcolor: "#581845", borderRadius: "10px", p: 2, mt: 2 }}>
            <SearchBar onSearch={onSearch} />
          </Box>
          <Paper
            elevation={3}
            sx={{
              bgcolor: "#FFF4DC",
              borderRadius: "10px",
              overflow: "hidden",
              mt: 2,
            }}
          >
            <TableComponent
              data={filteredData}
              columns={columns}
              onDelete={onDelete}
              onEdit={handleEdit}
            />
          </Paper>
          <ModalEmpresa getEmpresas={fetchEmpresas} />
        </Container>
      </Box>
  );
};

export default EmpresaComponent;
