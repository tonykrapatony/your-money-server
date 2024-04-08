import Router from "express";
import UserController from "./Controllers/UserController.js";
import IncomeController from "./Controllers/IncomeController.js";
import ExpenseController from "./Controllers/ExpenseController.js";
import AuthorisationController from "./Controllers/AuthorisationController.js";

const router = new Router();

router.post('/registration', AuthorisationController.registration);
router.post('/login', AuthorisationController.login);

router.get('/users', UserController.getUsers);
router.get('/users/:id', UserController.getUser);
router.put('/users/:id', UserController.updateUser);
router.patch('/users/:id/password', UserController.changeUserPassword);
router.delete('/users/:id', UserController.deleteUser);


router.post('/incomes', IncomeController.create);
router.get('/incomes/', IncomeController.getIncomes);
router.get('/incomes/:id', IncomeController.getIncome);
router.get('/incomes/user/:userId', IncomeController.getByUserId);
router.put('/incomes/:id', IncomeController.updateIncome);
router.delete('/incomes/:id', IncomeController.deleteIncome);

router.post('/expense', ExpenseController.create);
router.get('/expense/', ExpenseController.getExpenses);
router.get('/expense/:id', ExpenseController.getExpense);
router.get('/expense/user/:userId', ExpenseController.getByUserId);
router.put('/expense/:id', ExpenseController.updateExpense);
router.delete('/expense/:id', ExpenseController.deleteExpense);

export default router;