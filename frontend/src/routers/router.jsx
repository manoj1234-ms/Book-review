import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Homepage from '../pages/Homepage.jsx';
import LoginPage from '../pages/LoginPage.jsx';
import SignupPage from '../pages/SignupPage.jsx';
import AddBookPage from '../pages/AddBookPage.jsx';
import EditBookPage from '../pages/EditBookPage.jsx';
import EditReviewPage from '../pages/EditReviewPage.jsx';
import BookDetails from '../pages/BookDetails.jsx';
import InsertLinkPage from '../pages/InsertLinkPage.jsx';
import About from '../pages/About.jsx';
import Contact from '../pages/Contact.jsx';
import Profile from '../pages/Profile.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Homepage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signup',
        element: <SignupPage />,
      },
      {
        path: 'orders',
        element: <div>orders</div>,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'add-book',
        element: <AddBookPage />,
      },
      {
        path: 'books/:id',
        element: <BookDetails />,
      },
      {
        path: 'books/:id/edit',
        element: <EditBookPage />,
      },
      {
        path: 'books/:id/insert-link',
        element: <InsertLinkPage />,
      },
      {
        path: 'edit-review/:id',
        element: <EditReviewPage />,
      },
    ],
  },
]);

export default router;
