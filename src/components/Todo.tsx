import React from 'react'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'
import { Card, CardContent } from './ui/card'
import {  EllipsisIcon, MessageCircle } from 'lucide-react'
import { Button } from './ui/button'
import { DropdownMenu } from '@radix-ui/react-dropdown-menu'
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Item, ItemContent, ItemTitle } from './ui/item'

const actions = [
    {
        name: "Edit",
        url: "edit"
    }
]

const Todo = () => {
    return <Card className="relative shadow-none">
        <div className='absolute right-5 top-4'>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="w-fit cursor-pointer">
                        <EllipsisIcon />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-36 [--radius:0.65rem]" align="end">
                {actions.map((action) => (
                    <DropdownMenuItem key={action.name} className="p-0">
                    <Item size="sm" className="w-full p-2">
                        
                        <ItemContent className="gap-0.5">
                        <ItemTitle>{action.name}</ItemTitle>
                        </ItemContent>
                    </Item>
                    </DropdownMenuItem>
                ))}
                </DropdownMenuContent>
            </DropdownMenu>
       </div>
        <CardContent className='flex flex-col'>
            <div className='flex items-start gap-3'>
                <Checkbox id="terms-2" defaultChecked />
                <div className="grid gap-2">
                    <Label htmlFor="terms-2">Accept terms and conditions</Label>
                    <p className="text-muted-foreground text-sm">
                        By clicking this checkbox, you agree to the terms and conditions.
                    </p>
                    <div className='flex gap-2 items-center'>
                        <span className='text-xs text-gray-400'>
                            {new Date().toDateString()}
                        </span>
                        <div className='flex items-center gap-2 text-gray-400'>
                            <MessageCircle className='size-4' />
                            <span>{ 0}</span>
                        </div>
                    </div>
                </div>
            </div>
            
        </CardContent>
    </Card>
}

export default Todo