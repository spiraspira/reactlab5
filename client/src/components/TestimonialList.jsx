import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Typography, List, ListItem, ListItemText } from "@material-ui/core";
import TestimonialInfo from "./TestimonialInfo";
import TestimonialForm from "./TestimonialForm";
import TestimonialEdit from "./TestimonialEdit";
import {
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
  sortTestimonialsByDateAsc,
  fetchTestimonials
} from "../actions/testimonialActions";

// Добавляем библиотеку для генерации файлов
import ExcelJS from "exceljs";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const TestimonialList = ({
  testimonials,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
  sortTestimonialsByDateAsc,
  fetchTestimonials
}) => {
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const userRole = localStorage.getItem("role"); // Get user role from localStorage

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const handleTestimonialClick = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsModalOpen(true);
  };

  const handleEditClick = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setIsEditModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTestimonial(null);
    setIsModalOpen(false);
    setIsEditModalOpen(false);
  };

  const handleAddTestimonial = (testimonial) => {
    addTestimonial(testimonial);
  };

  const handleUpdateTestimonial = (testimonial) => {
    updateTestimonial(testimonial);
  };

  const handleDeleteTestimonial = (testimonial) => {
    deleteTestimonial(testimonial);
  };

  const handleSortTestimonialsByDateAsc = () => {
    sortTestimonialsByDateAsc();
  };

  const handleSaveJson = () => {
    const testimonialsData = JSON.stringify(testimonials.testimonials);
    const blob = new Blob([testimonialsData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "testimonials.json";
    link.click();
  };

  const handleSavePdf = () => {
    const docDefinition = {
      content: [
        { text: "Отзывы", style: "header" },
        { text: " " },
        testimonials.testimonials.map((testimonial) => new Date(testimonial.date).toLocaleString() + " " + testimonial.name + ": " + testimonial.testimonial)
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 15, 0, 0]
        }
      }
    };

    // Генерируем файл PDF
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    pdfDocGenerator.download("testimonials.pdf");
  };

  const handleSaveExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Properties");

    // Добавляем заголовки столбцов
    worksheet.addRow(["Дата", "Автор", "Отзыв"]);

    // Добавляем данные по каждому объекту недвижимости
    testimonials.testimonials.forEach((testimonial) => {
      worksheet.addRow([new Date(testimonial.date).toLocaleString(), testimonial.name, testimonial.testimonial]);
    });

    // Генерируем файл Excel
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "testimonials.xlsx";
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <section className="testimonial-list">
      <Typography variant="h2">Отзывы</Typography>
      <Button variant="outlined" onClick={handleSortTestimonialsByDateAsc}>
        Sort by Date (Ascending)
      </Button>
      <Button variant="outlined" onClick={handleSaveJson}>
        Скачать JSON
      </Button>
      <Button variant="outlined" onClick={handleSaveExcel}>
        Скачать Excel
      </Button>
      <Button variant="outlined" onClick={handleSavePdf}>
        Скачать PDF
      </Button>
      <List style={{ margin: 0, padding: 0 }}>
        {testimonials.testimonials.map((testimonial) => (
          <ListItem key={testimonial.Id} style={{ marginBottom: "10px" }}>
            <ListItemText primary={testimonial.name + " " + new Date(testimonial.date).toLocaleString()} />
            {userRole === "admin" ? (
              <>
                <Button onClick={() => handleTestimonialClick(testimonial)}>View</Button>
                <Button onClick={() => handleDeleteTestimonial(testimonial)}>Delete</Button>
                <Button onClick={() => handleEditClick(testimonial)}>Edit</Button>
              </>
            ) : (
              <Button onClick={() => handleTestimonialClick(testimonial)}>View</Button>
            )}
          </ListItem>
        ))}
      </List>
      {isModalOpen && (
        <TestimonialInfo testimonial={selectedTestimonial} closeModal={closeModal} />
      )}
      {isEditModalOpen && (
        <TestimonialEdit
          testimonial={selectedTestimonial}
          closeModal={closeModal}
          updateTestimonial={handleUpdateTestimonial}
        />
      )}
        <>
          <Typography variant="h2">Новый отзыв</Typography>
          <TestimonialForm addTestimonial={handleAddTestimonial} />
        </>
    </section>
  );
};

const mapStateToProps = (state) => ({
  testimonials: state.testimonials
});

export default connect(mapStateToProps, {
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
  sortTestimonialsByDateAsc,
  fetchTestimonials
})(TestimonialList);