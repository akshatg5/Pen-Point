import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

interface BlogCardProps {
  title: string;
  content: string;
  toLink: string;
  authorId: string;
  publishedAt: Date;
  firstName: string;
  lastName: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  title,
  content,
  toLink,
  publishedAt,
  firstName,
  lastName,
}) => {
  return (
    <div className="w-1/2  border flex justify-between items-center border-slate-400 rounded-2xl hover:shadow-xl p-5 my-4">
      <div>
        <Link to={toLink}>
          <div className="flex items-center">
            <p className="text-slate-500">
              {firstName} {" "} {lastName} {" "} ;
            </p>
            <p className="ml-2 text-slate-500">Published On {publishedAt.toLocaleDateString()}</p>
          </div>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-1">
            {title}
          </h5>
          <ReactMarkdown className="font-normal text-gray-700 dark:text-gray-400">
            {content.slice(0, 100) + "..."}
          </ReactMarkdown>
          <div className="flex items-center">
            <p className="font-xs text-slate-400">
              {`${Math.ceil(content.length / 1000)}`} minute read
            </p>
            <Button className="my-2 ml-5">
              Read more
              <svg
                className="-mr-1 ml-2 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </div>
        </Link>
      </div>
      <div className="ml-6">
        <div className="bg-slate-700 rounded-full w-20 h-20 flex justify-center items-center">
          <p>{title[0]}</p>
        </div>
      </div>
    </div>
  );
};
