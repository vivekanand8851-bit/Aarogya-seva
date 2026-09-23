import React from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../mock/mockData';
import { useParams } from 'react-router-dom';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';

export function BlogListPage() {
  return (
    <>
      <SEO
        title="Ayurveda & Wellness Blog"
        description="Practical Ayurveda and wellness articles from Aarogya Seva covering Ashwagandha, Shilajit, digestion, daily wellness and herbal products."
        url="/blog"
      />
    <div className="bg-[#fbf7ec] py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-xs tracking-[4px] text-[#8a7a5a] uppercase">Wellness Journal</span>
          <h1 className="font-serif text-4xl md:text-5xl text-[#0f3d2e] mt-2">The Aarogya Blog</h1>
          <div className="w-16 h-[3px] bg-[#e6b64c] mx-auto mt-4 rounded" />
          <p className="text-[#6a6a6a] max-w-2xl mx-auto mt-4">Insights, tips and ancient wisdom for your modern wellness journey.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <Link key={post.id} to={`/blog/${post.id}`} className="group bg-white rounded-xl overflow-hidden border border-[#ede4cf] hover:shadow-lg transition">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>
              <div className="p-6">
                <span className="text-[11px] font-semibold tracking-widest text-[#8a7a5a] uppercase">{post.category}</span>
                <h3 className="font-serif text-xl text-[#0f3d2e] mt-2 group-hover:text-[#1a5c40]">{post.title}</h3>
                <p className="text-sm text-[#6a6a6a] mt-2 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center gap-3 mt-4 text-xs text-[#8a7a5a]">
                  <span className="flex items-center gap-1"><Calendar size={12} />{post.date}</span>
                  <span className="flex items-center gap-1"><Clock size={12} />{post.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}

export function BlogDetailPage() {
  const { id } = useParams();
  const post = BLOG_POSTS.find((p) => p.id === id);
  if (!post) return <div className="py-16 text-center">Post not found</div>;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: [post.image],
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Organization', name: 'Aarogya Seva' },
    publisher: { '@type': 'Organization', name: 'Aarogya Seva' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://aarogyaseva.vercel.app/blog/${post.id}` },
  };

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        image={post.image}
        url={`/blog/${post.id}`}
        jsonLd={articleJsonLd}
      />
      <div className="bg-[#fbf7ec] py-10">
      <div className="max-w-3xl mx-auto px-4">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-[#0f3d2e] hover:text-[#1a5c40] mb-6"><ArrowLeft size={16} /> Back to Blog</Link>
        <span className="text-[11px] font-semibold tracking-widest text-[#8a7a5a] uppercase">{post.category}</span>
        <h1 className="font-serif text-3xl md:text-5xl text-[#0f3d2e] mt-3 leading-tight">{post.title}</h1>
        <div className="flex items-center gap-4 mt-4 text-sm text-[#8a7a5a]">
          <span className="flex items-center gap-1"><User size={14} />{post.author}</span>
          <span className="flex items-center gap-1"><Calendar size={14} />{post.date}</span>
          <span className="flex items-center gap-1"><Clock size={14} />{post.readTime}</span>
        </div>
        <img src={post.image} alt={post.title} className="w-full aspect-[16/9] object-cover rounded-2xl mt-8" />
        <div className="prose prose-lg max-w-none mt-8 text-[#3a3a3a] leading-relaxed space-y-6">
          <p className="text-xl text-[#0f3d2e] font-serif italic">{post.excerpt}</p>
          {(post.sections || []).map(([heading, text]) => (
            <section key={heading}>
              <h2 className="font-serif text-2xl text-[#0f3d2e] mt-8">{heading}</h2>
              <p>{text}</p>
            </section>
          ))}
          <div className="border-t border-[#ede4cf] pt-6">
            <p className="text-sm text-[#6a6a6a]">
              <strong>Educational note:</strong> This article is general information, not medical advice. Evidence can differ by herb, preparation, dose and person. If you have a medical condition or take medicines, speak with a qualified healthcare professional before using supplements.
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
