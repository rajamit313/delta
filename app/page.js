'use client'
import { useState } from 'react'
import React from 'react'

const markdown = () => {
  const [Markdown, setMarkdown] = useState('');
  const [EditMarkdown, setEditMarkdown] = useState(Markdown);

  const editHandler = () => {
    const formattedMarkdown = Markdown
      .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>');

    const lines = formattedMarkdown.split('\n');

    const html = lines.map(line => {
      if (/^# (.*)$/.test(line)) {
        return `<h1 style="font-size: 45px">${line.replace(/^# /, '')}</h1>`;
      } else if (/^## (.*)$/.test(line)) {
        return `<h2 style="font-size: 35px">${line.replace(/^## /, '')}</h2>`;
      } else if (/^### (.*)$/.test(line)) {
        return `<h3 style="font-size: 25px">${line.replace(/^### /, '')}</h3>`;
      } else {
        return `<p>${line}</p>`;
      }
    }).join('');

    document.querySelector('#output').innerHTML = html;
  };

  return (
    <>
      <div className="flex flex-row gap-4 min-h-[90vh] p-6 bg-gray-100">
        <textarea
          className="w-1/2 h-[90vh] p-4 bg-black text-white rounded-md"
          id="edit"
          value={Markdown}
          onChange={e => setMarkdown(e.target.value)}
        ></textarea>
        <div
          className="w-full md:w-1/2 h-[90vh] p-4 bg-white text-black rounded-md"
          id="output"
        ></div>
      </div>
      <div className="flex justify-center">
        <button className="bg-green-400 p-2 rounded-md" onClick={editHandler}>
          Edit
        </button>
      </div>
    </>
  );
};

export default markdown;
