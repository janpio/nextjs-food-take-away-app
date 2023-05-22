import { prisma } from '../../../../../../prisma/db/client'
import { NextApiRequest, NextApiResponse } from 'next'
import authMiddleware from '@/pages/api/auth/auth-middleware'

export default authMiddleware(handler)

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method } = req
    if (method === 'POST') {
      await confirmOrderInDB(req, res)
    }
  } catch (err: any) {
    console.error(err.message)
    res
      .status(500)
      .send({ success: false, status: 500, errors: [{ msg: 'Server Error' }] })
  }
}

//----------------------------------------------------------------------------------
const confirmOrderInDB = async (req: NextApiRequest, res: NextApiResponse) => {
  const orderId = req.query.orderId?.[0]

  if (!orderId) {
    return res.status(400).json({
      success: false,
      status: 400,
      errors: [{ msg: 'No order id provided' }],
    })
  }

  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  })

  if (!order) {
    return res.status(404).json({
      success: false,
      status: 404,
      errors: [{ msg: 'Order not found' }],
    })
  }

  const updatedOrder = await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      orderConfirmed: true,
    },
  })

  return res.status(200).json({
    success: true,
    status: 200,
    msg: `The order has been confirmed`,
    data: updatedOrder,
  })
}
