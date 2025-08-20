import { Routes, Route, Navigate } from 'react-router';
import HomePage from './pages/HomePage.jsx';
import ChatPage from './pages/ChatPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import NotificationsPage from './pages/NotificationPage.jsx';
import CallPage from './pages/CallPage.jsx';
import OnboardingPage from './pages/OnboardingPage.jsx';
import toast, { Toaster } from 'react-hot-toast';
import PageLoader from './components/PageLoader.jsx';
import useAuthUser from './hooks/useAuthUser.js';
import Layout from './components/Layout.jsx';
import FriendsPage from './pages/FriendsPage.jsx';
import { useThemeStore } from './store/useThemeStore.js';


const App = () => {
  const { isLoading, authUser } = useAuthUser();
  const { theme } = useThemeStore();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  if (isLoading) return <PageLoader />;

  return (
    <div className="h-screen" data-theme={theme}>
      {/* <ThemeSelector/> */}
      <Routes>
        {/* HOME PAGE */}
        <Route
          path="/"
          element={
            isAuthenticated && isOnboarded
              ? (
                <Layout showSidebar={true} >
                  <HomePage />
                </Layout>
              )
              : <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
          }
        />
        {/* SIGNUP PAGE */}

        <Route
          path="/signup"
          element={!isAuthenticated ? <SignUpPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />}
        />
        {/* LOGIN PAGE */}

        <Route
          path="/login"
          element={!isAuthenticated ? <LoginPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />}
        />
        {/* NOTIFICATION PAGE */}


        <Route
          path="/notification"
          element={isAuthenticated && isOnboarded ? (
            <Layout showSidebar={true}>
              <NotificationsPage />
            </Layout>
          ) : (

            <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
          )}
        />
        {/* CHAT PAGE */}

        <Route
          path="/chat/:id"
          element={isAuthenticated && isOnboarded ? (
            <Layout showSidebar={false}>
              <ChatPage />
            </Layout>
          ) : (

            <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
          )}
        />
         <Route
          path="/friends"
          element={isAuthenticated && isOnboarded ? (
            <Layout showSidebar={true}>
              <FriendsPage />
            </Layout>
          ) : (

            <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
          )}
        />
        {/* CALL PAGE */}

        <Route
          path="/call/:id"
          element={isAuthenticated && isOnboarded ? (
        
              <CallPage/>
      
          ) : (

            <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
          )}
        />
        {/* ONBOARDING PAGE */}

        <Route
          path="/onboarding"
          element={
            isAuthenticated
              ? (!isOnboarded ? <OnboardingPage /> : <Navigate to="/" />)
              : <Navigate to="/login" />
          }
        />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
