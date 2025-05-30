from django.shortcuts import render, redirect
from .models import Task

def index(request):
    if request.method == 'POST':
        task_title = request.POST.get('task')
        if task_title:
            Task.objects.create(title=task_title)
        return redirect('index')

    tasks = Task.objects.all().order_by('-id')
    return render(request, 'todo/index.html', {'tasks': tasks})

def toggle_task(request, task_id):
    task = Task.objects.get(id=task_id)
    task.completed = not task.completed
    task.save()
    return redirect('index')

def delete_task(request, task_id):
    task = Task.objects.get(id=task_id)
    task.delete()
    return redirect('index')
