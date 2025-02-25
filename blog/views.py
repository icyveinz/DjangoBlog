from django.http import Http404
from django.shortcuts import render

from blog.models import Post


# Create your views here.
async def post_list(request):
    posts = await Post.published.all()
    return render(request, 'blog/post/list.html', {'posts': posts})

async def post_detail(request, post_id):
    try:
        post = await Post.objects.aget(id=post_id)
    except Post.DoesNotExist:
        raise Http404("Post does not exist")
    return render(request, 'blog/post/detail.html', {'post': post})