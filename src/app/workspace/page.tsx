import React from 'react'
import WorkspaceNavbar from './_components/WorkspaceNavbar';
import Sidebar from './_components/Sidebar';
import Workspace from './_components/Workspace';


function DashboardPage() {
    return (
        <div className='min-h-screen flex'>
            <Sidebar />

            <div className='flex flex-col w-[calc(100vw-250px)] ml-[250px]'>
                <div className='fixed top-0 right-0 bg-white h-[80px] w-[calc(100vw-250px)] px-4 py-3'>
                    <WorkspaceNavbar />
                </div>
                <div className='mt-[80px] min-h-[calc(100vh-80px)] px-4 py-4'>
                    <Workspace />
                </div>
            </div>

        </div>
    )
}

export default DashboardPage;