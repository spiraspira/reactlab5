import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Typography, List, ListItem, ListItemText, Button } from "@material-ui/core";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import MessageInfo from "./MessageInfo";
import MessageForm from "./MessageForm";
import MessageEdit from "./MessageEdit";
import {
  addMessage,
  updateMessage,
  deleteMessage,
  sortMessagesByDateAsc,
  fetchMessages
} from "../actions/messageActions";

// Добавляем библиотеку для генерации файлов
import ExcelJS from "exceljs";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const MessageList = ({
  messages,
  addMessage,
  updateMessage,
  deleteMessage,
  sortMessagesByDateAsc,
  fetchMessages
}) => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleMessageClick = (message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  const handleEditClick = (message) => {
    setSelectedMessage(message);
    setIsEditModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMessage(null);
    setIsModalOpen(false);
    setIsEditModalOpen(false);
  };

  const handleAddMessage = (message) => {
    addMessage(message);
  };

  const handleUpdateMessage = (message) => {
    updateMessage(message);
  };

  const handleDeleteMessage = (message) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMessage(message);
        Swal.fire("Deleted!", "The message has been deleted.", "success");
      }
    });
  };

  const handleSortMessagesByDate = () => {
    sortMessagesByDateAsc();
  };

  const handleSaveJson = () => {
    const json = JSON.stringify(messages.messages, null, 2);
    const element = document.createElement("a");
    const file = new Blob([json], { type: "application/json" });
    element.href = URL.createObjectURL(file);
    element.download = "messages.json";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSavePdf = () => {
    const docDefinition = {
      content: [
        { text: "Сообщения", style: "header" },
        { text: " " },
        messages.messages.map((message) => new Date(message.date).toLocaleString() + " " + message.email + " " + message.name + ": " + message.message)
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
    pdfDocGenerator.download("messages.pdf");
  };

  const handleSaveExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Properties");

    // Добавляем заголовки столбцов
    worksheet.addRow(["Дата", "Почта", "Имя", "Сообщение"]);

    // Добавляем данные по каждому объекту недвижимости
    messages.messages.forEach((message) => {
      worksheet.addRow([new Date(message.date).toLocaleString(), message.email, message.name, message.message]);
    });

    // Генерируем файл Excel
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "messages.xlsx";
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <section className="message-list">
      <Typography variant="h2">Сообщения</Typography>
      <Button onClick={handleSortMessagesByDate}>Сортировать по дате</Button>
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
        {messages.messages.map((message) => (
          <ListItem key={message.Id} style={{ marginBottom: "10px" }}>
            <ListItemText
              primary={message.name + " " + new Date(message.date).toLocaleString()}
            />
            <Button onClick={() => handleMessageClick(message)}>Просмотр</Button>
            {userRole !== "user" && (
              <>
                <Button onClick={() => handleDeleteMessage(message)}>Удалить</Button>
                <Button onClick={() => handleEditClick(message)}>Редактировать</Button>
              </>
            )}
          </ListItem>
        ))}
      </List>
      {isModalOpen && (
        <MessageInfo message={selectedMessage} closeModal={closeModal} />
      )}
      {isEditModalOpen && (
        <MessageEdit
          message={selectedMessage}
          closeModal={closeModal}
          updateMessage={handleUpdateMessage}
        />
      )}
      <Typography variant="h2">Новое сообщение</Typography>
      <MessageForm addMessage={handleAddMessage} />
    </section>
  );
};

const mapStateToProps = (state) => ({
  messages: state.messages
});

export default connect(mapStateToProps, {
  addMessage,
  updateMessage,
  deleteMessage,
  sortMessagesByDateAsc,
  fetchMessages
})(MessageList);