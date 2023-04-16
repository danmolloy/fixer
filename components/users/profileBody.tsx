import React from "react";

export default function ProfileBody() {
  return (
    <div className="p-2 m-2" data-testid="profile-body">
      <div className="py-1">
          <h2 className="text-lg text-slate-500 py-1">Your Mutual History</h2>
          <ul>
            <li className="text-blue-500 hover:underline hover:cursor-pointer">
              BBCSO: Brahms Symphonies, March 2022
            </li>
            <li className="text-blue-500 hover:underline hover:cursor-pointer">
            BBCSO: Austria Tour, April 2022
            </li>
          </ul>
        </div>
        <div className="py-2">
        <h2 className="text-lg text-slate-500 py-1">Professional Work</h2>
          <ul className="">
            <li>At vero eos et accusamus</li>
            <li>Iusto odio dignissimos ducimus qui </li>
            <li>Blanditiis praesentium voluptatum deleniti </li>
            <li>Atque corrupti quos dolores </li>
            <li>Quas molestias excepturi </li>
            <li>Sint occaecati cupiditate non provident </li>
            <li>Similique sunt in culpa qui </li>
            <li>Officia deserunt mollitia animi</li>
            <li>Id est laborum et dolorum fuga</li>
            <li>Blanditiis praesentium voluptatum deleniti </li>
            <li>Atque corrupti quos dolores </li>
            <li>Quas molestias excepturi </li>
            <li>Blanditiis praesentium voluptatum deleniti </li>
            <li>Atque corrupti quos dolores </li>
            <li>Quas molestias excepturi </li>
          </ul>
          </div>
          <div className="py-1">
        <h2 className="text-lg text-slate-500 py-1">Education</h2>
        <ul className="">
            <li>At vero eos et accusamus (2012-2013)</li>
            <li>Iusto odio dignissimos ducimus qui (2009-2011)</li>
        </ul>
        </div>
        <div className="py-1">
        <h2 className="text-lg text-slate-500 py-1">Referees</h2>
        <ul>
            <li className="py-1">
              <h4>Roy Dereks</h4>
              <p className="">e: roy@dereks.com</p>
            </li>
            <li className="py-1">
              <h4>Brett Sturdy</h4>
              <p>e: brett@sturdy.com</p>
            </li>
        </ul>
        </div>
        
      </div>
  )
}