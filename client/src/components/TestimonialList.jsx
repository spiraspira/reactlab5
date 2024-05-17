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

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

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
    Swal.fire({
      title: 'Confirmation',
      text: 'Are you sure you want to delete this testimonial?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTestimonial(testimonial);
      }
    });
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

    const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    pdfDocGenerator.download("testimonials.pdf");
  };

  const handleSaveExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Properties");

    worksheet.addRow(["Дата", "Автор", "Отзыв"]);

    testimonials.testimonials.forEach((testimonial) => {
      worksheet.addRow([new Date(testimonial.date).toLocaleString(), testimonial.name, testimonial.testimonial]);
    });

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
        Save as JSON
      </Button>
      <Button variant="outlined" onClick={handleSavePdf}>
        Save as PDF
      </Button>
      <Button variant="outlined" onClick={handleSaveExcel}>
        Save as Excel
      </Button>
      <List>
        {testimonials.testimonials.map((testimonial) => (
          <ListItem key={testimonial.id}>
            <ListItemText
              primary={testimonial.name}
              secondary={new Date(testimonial.date).toLocaleString()}
              onClick={() => handleTestimonialClick(testimonial)}
            />
            {userRole === "admin" && (
              <>
                <Button color="primary" onClick={() => handleEditClick(testimonial)}>
                  Edit
                </Button>
                <Button color="secondary" onClick={() => handleDeleteTestimonial(testimonial)}>
                  Delete
                </Button>
              </>
            )}
          </ListItem>
        ))}
      </List>
      {isModalOpen && (
        <TestimonialInfo
          testimonial={selectedTestimonial}
          closeModal={closeModal}
        />
      )}
      {isEditModalOpen && (
        <TestimonialEdit
          testimonial={selectedTestimonial}
          closeModal={closeModal}
          updateTestimonial={handleUpdateTestimonial}
        />
      )}
      {userRole === "admin" && (
        <TestimonialForm addTestimonial={handleAddTestimonial} />
      )}
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