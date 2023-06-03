package controllers

import (
	"Wira/database"
	"Wira/models"

	"github.com/gofiber/fiber/v2"
)

func Reads(c *fiber.Ctx) error {
	var users []models.User

	database.DB.Find(&users)

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Data tersedia",
		"data":    users,
	})
}

func Read(c *fiber.Ctx) error {
	var user models.User

	id := c.Params("id")

	if id == " " {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "id tidak boleh kosong",
		})
	}
	if err := database.DB.Where("id = ?", id).First(&user).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Gagal membuat data user",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Data ditemukan",
		"data":    user,
	})
}

func Create(c *fiber.Ctx) error {
	var UserReq models.UserReq

	if err := c.BodyParser(&UserReq); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Gagal parsing JSON",
		})
	}

	var User models.User
	User.Nama = UserReq.Nama
	User.Kelas = UserReq.Kelas
	User.Prodi = UserReq.Prodi

	if err := database.DB.Create(&User).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Gagal menambahkan data user",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Data user berhasil dibuat",
		"user":    User,
	})

}

func Update(c *fiber.Ctx) error {
	userUpdate := new(models.UserReq)

	if err := c.BodyParser(&userUpdate); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Gagal parsingJSON",
		})
	}

	id := c.Params("id")
	if id == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "id tidak boleh kosong",
		})

	}
	user := models.User{}

	if err := database.DB.First(&user, "id = ?", id).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Id tidak boleh kosong",
		})

	}
	user.Nama = userUpdate.Nama
	user.Kelas = userUpdate.Kelas
	user.Prodi = userUpdate.Prodi

	if err := database.DB.Model(&user).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"err": "error model",
		})
	}

	result := database.DB.Where("id = ?", id).Updates(&user)
	if result.Error != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"err": "error model",
		})
	}
	if result.RowsAffected == 0 {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Error Rowsaffected",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Data berhasil di update",
		"data":    user,
	})
}

func Delete(c *fiber.Ctx) error {
	user := models.User{}

	id := c.Params("id")
	if err := database.DB.First(&user, id).Delete(&user).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Gagal menghapus data",
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Data berhasil dihapus",
	})

}
