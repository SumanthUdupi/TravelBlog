import DOMPurify from 'dompurify';

// A lightweight markdown parser for our specific needs
// Supports: ## H2, ### H3, **Bold**, * Italic, * Lists, > Blockquotes, [Link](url)
const SimpleMarkdown = ({ content }) => {
    if (!content) return null;

    const lines = content.split('\n');
    const elements = [];
    let listBuffer = [];

    const flushList = (key) => {
        if (listBuffer.length > 0) {
            elements.push(
                <ul key={`list-${key}`} className="md-list">
                    {listBuffer.map((item, index) => (
                        <li key={index} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(parseInline(item)) }} />
                    ))}
                </ul>
            );
            listBuffer = [];
        }
    };

    const parseInline = (text) => {
        const parsed = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
        return parsed;
    };

    lines.forEach((line, index) => {
        // Headers
        if (line.startsWith('## ')) {
            flushList(index);
            elements.push(<h2 key={index}>{line.replace('## ', '')}</h2>);
        } else if (line.startsWith('### ')) {
            flushList(index);
            elements.push(<h3 key={index}>{line.replace('### ', '')}</h3>);
        }
        // Lists
        else if (line.trim().startsWith('* ')) {
            listBuffer.push(line.trim().substring(2));
        } else if (line.trim().startsWith('- ')) {
            listBuffer.push(line.trim().substring(2));
        }
        // Blockquotes
        else if (line.startsWith('> ')) {
            flushList(index);
            elements.push(
                <blockquote key={index}>
                    {line.replace('> ', '')}
                </blockquote>
            );
        }
        // Paragraphs (ignore empty lines inside lists, but break lists on empty lines)
        else if (line.trim() === '') {
            flushList(index);
        } else {
            flushList(index);
            elements.push(
                <p key={index} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(parseInline(line)) }} />
            );
        }
    });

    flushList('final');

    return <div>{elements}</div>;
};

export default SimpleMarkdown;
