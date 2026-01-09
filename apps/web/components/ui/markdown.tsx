import React from "react";
import ReactMarkdown from "react-markdown";

function Markdown({ children }: { children: string }) {
  return (
    <div className='p-4 rounded-lg bg-linear-to-br from-accent/20 to-transparent border border-accent/30 w-full no-tailwind prose overflow-x-hidden leading-tight prose-a:text-blue-600 prose-a:hover:underline prose-blockquote:border-gray-300 prose-blockquote:text-gray-600 prose-table:border-gray-300 prose-th:border-gray-300 prose-th:bg-gray-100 prose-td:border-gray-300 prose-hr:border-gray-300 dark:prose-invert'>
      <ReactMarkdown
        components={{
          h1: ({ node, ...props }) => (
            <h1 className='text-2xl font-bold' {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className='text-xl font-semibold' {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className='text-lg font-semibold' {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h4 className='text-md font-semibold' {...props} />
          ),
          h5: ({ node, ...props }) => (
            <p className='text-xl font-semibold' {...props} />
          ),
          h6: ({ node, ...props }) => {
            const [time, mood] = String(props.children).split("-");
            return (
              <p className='flex text-muted-foreground mt-1'>
                <span className='text-xl mx-10'>{time}</span>

                {mood && (
                  <>
                    <span className='text-xl'> | </span>
                    <span className='text-xs'>{mood}</span>
                  </>
                )}
              </p>
            );
          },
          p: ({ node, ...props }) => (
            <p className='text-base leading-relaxed my-4' {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className='list-disc list-inside my-4 ml-4' {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className='list-decimal list-inside my-4 ml-4' {...props} />
          ),
          li: ({ node, ...props }) => <li className='mb-2' {...props} />,
          blockquote: ({ node, ...props }) => (
            <blockquote
              className='border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4'
              {...props}
            />
          ),
          a: ({ node, ...props }) => (
            <a className='text-blue-600 hover:underline' {...props} />
          ),
          table: ({ node, ...props }) => (
            <table
              className='table-auto border-collapse border border-gray-300 my-4'
              {...props}
            />
          ),
          th: ({ node, ...props }) => (
            <th
              className='border border-gray-300 bg-gray-100 px-4 py-2 font-semibold'
              {...props}
            />
          ),
          td: ({ node, ...props }) => (
            <td className='border border-gray-300 px-4 py-2' {...props} />
          ),
          hr: ({ node, ...props }) => (
            <hr className='border-t border-gray-300 my-8' {...props} />
          ),
        }}
      >
        {typeof children === "string" ? children : ""}
      </ReactMarkdown>
    </div>
  );
}

export default Markdown;
