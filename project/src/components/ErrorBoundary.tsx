import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    private handleReload = () => {
        window.location.reload();
    };

    private handleGoHome = () => {
        window.location.href = '/';
    };

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 p-6">
                    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
                        <div className="w-16 h-16 mx-auto mb-6 bg-pink-100 rounded-full flex items-center justify-center">
                            <AlertTriangle className="w-8 h-8 text-pink-500" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: "'DM Serif Display', serif" }}>
                            Something went wrong
                        </h1>
                        <p className="text-gray-500 mb-6 text-sm leading-relaxed">
                            We're sorry, but something unexpected happened. Please try refreshing the page or go back to the homepage.
                        </p>
                        <div className="flex gap-3 justify-center">
                            <button
                                onClick={this.handleReload}
                                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-medium text-sm hover:shadow-lg transition-all"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Refresh Page
                            </button>
                            <button
                                onClick={this.handleGoHome}
                                className="px-5 py-2.5 border border-gray-200 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-50 transition-all"
                            >
                                Go Home
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
