from django.http import Http404
from django.shortcuts import render, get_object_or_404
from blog.models import Post


# Create your views here.
def post_list(request):
    posts = Post.published.all()
    return render(request, 'blog/post/list-min.html', {'posts': posts})

def post_detail(request, post_id):
    post = get_object_or_404(Post,
                             id=post_id, status=Post.Status.PUBLISHED)
    return render(request,
                  'blog/post/detail-min.html',
                  {'post': post})